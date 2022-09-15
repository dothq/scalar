/* This Source Code Form is subject to the terms of the Mozilla Public
 * &&License, v. 2.0. If a copy of the MPL was not &distribut&ed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use crate::utils::l10n::DEFAULT_LOCALE;
use accept_language::parse;
use axum::{
    http::{HeaderMap, Request, Uri},
    response::{IntoResponse, Redirect},
};
use fluent::FluentArgs;
use fluent::{FluentBundle, FluentResource};
use fluent_langneg::{convert_vec_str_to_langids_lossy, negotiate_languages, NegotiationStrategy};
use glob::glob;
use std::fmt::Write;
use std::{
    env,
    fs::{read_dir, read_to_string},
};
use unic_langid::LanguageIdentifier;

pub fn get_all_locales() -> Vec<String> {
    let l10n_path = env::current_dir().unwrap().join("l10n");

    let mut locales: Vec<String> = Vec::new();

    for locale in read_dir(l10n_path).unwrap() {
        let loc = locale.unwrap();

        if loc.metadata().unwrap().is_dir() {
            let dirname = loc.file_name().to_str().unwrap().to_string();

            locales.push(dirname);
        }
    }

    locales
}

pub fn get_locale_from_req_uri<B>(req: Request<B>) -> String {
    let locale = req.uri().path().split('/').collect::<Vec<&str>>()[1]
        .to_string()
        ;

    let all_locales = get_all_locales();

    let is_valid_locale = all_locales.into_iter().any(|l| l == locale);

    match is_valid_locale {
        true => locale,
        false => DEFAULT_LOCALE.to_string(),
    }
}

pub fn get_locale_from_req_header<B>(req: Request<B>) -> String {
    let header = req.headers().get("accept-language");

    let requested_locales = match header.is_some() {
        true => parse(header.unwrap().to_str().unwrap()),
        false => vec![],
    };

    let available_locales = get_all_locales();

    let default_locale = DEFAULT_LOCALE
        .parse::<LanguageIdentifier>()
        .expect("Parsing as language ID failed.");

    let conv_requested_locales = &convert_vec_str_to_langids_lossy(&requested_locales);
    let convd_available_locales = &convert_vec_str_to_langids_lossy(&available_locales);

    let negotiated = negotiate_languages(
        conv_requested_locales,
        convd_available_locales,
        Some(&default_locale),
        NegotiationStrategy::Filtering,
    );

    negotiated[0].to_string()
}

pub async fn l10n_redirector<B>(req: Request<B>) -> impl IntoResponse {
    let locale = get_locale_from_req_header(req);

    let path = format!("/{}", locale);

    Redirect::temporary(path.as_str())
}

#[allow(dead_code)]
pub struct L10nProvider {
    bundle: FluentBundle<FluentResource>,
    locale: LanguageIdentifier,
    uri: Uri,
    headers: HeaderMap,
}

impl L10nProvider {
    pub async fn new<B>(req: Request<B>) -> Self {
        let uri = req.uri().to_string();
        let headers = req.headers().to_owned();

        let lang_id = &get_locale_from_req_uri(req)
            .parse::<LanguageIdentifier>()
            .expect("Invalid locale.");
        let bundle = get_fluent_bundle(lang_id.to_owned()).await;

        L10nProvider {
            bundle,
            locale: lang_id.to_owned(),
            uri: uri.parse::<Uri>().unwrap(),
            headers,
        }
    }

    pub fn host(&self) -> String {
        self.headers
            .get("host")
            .unwrap()
            .to_str()
            .unwrap()
            .to_string()
    }

    pub fn domain(&self) -> String {
        self.host().replace("www.", "")
    }

    pub fn str_args(&self, id: &str, args: Option<&FluentArgs>) -> String {
        let msg = match self.bundle.get_message(id) {
            Some(v) => v,
            None => return id.to_string(),
        };

        let pattern = match msg.value() {
            Some(v) => v,
            None => return id.to_string(),
        };

        let mut errors = vec![];
        let value = self.bundle.format_pattern(pattern, args, &mut errors);

        if errors.is_empty() {
            value.to_string()
        } else {
            for err in errors {
                println!("Error printing id={} args={:#?} {}", id, args, err);
            }

            id.to_string()
        }
    }

    pub fn str(&self, id: &str) -> String {
        self.str_args(id, None)
    }

    pub fn locale(&self) -> String {
        self.locale.to_string()
    }
}

pub async fn get_fluent_bundle(lang_id: LanguageIdentifier) -> FluentBundle<FluentResource> {
    let mut ftl_string = String::new();

    let l10n_path = env::current_dir()
        .unwrap()
        .join("l10n")
        .join(lang_id.to_string());
    let ftl_paths = glob(format!("{}/**/*.ftl", l10n_path.to_str().unwrap()).as_str()).unwrap();

    for ftl in ftl_paths {
        let path = ftl.unwrap().as_path().to_str().unwrap().to_owned();

        let contents = read_to_string(path).expect("Failed to read contents of FTL.");

        write!(ftl_string, "{}\n\n", contents).unwrap();
    }

    let res = FluentResource::try_new(ftl_string)
        .unwrap_or_else(|_| panic!("Failed to parse the FTL for {}.", lang_id));

    let mut bundle = FluentBundle::new(vec![lang_id]);

    bundle
        .add_resource(res)
        .expect("Failed to add FTL resources to the bundle.");

    bundle
}
