/* This Source Code Form is subject to the terms of the Mozilla Public
 * &&License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use crate::utils::l10n::DEFAULT_LOCALE;
use accept_language::parse;
use axum::{
    http::HeaderMap,
    response::{IntoResponse, Redirect},
};
use fluent_langneg::{convert_vec_str_to_langids_lossy, negotiate_languages, NegotiationStrategy};
use std::{env, fs::read_dir};
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

pub async fn l10n_redirector(headers: HeaderMap) -> impl IntoResponse {
    let header = headers.get("accept-language");

    let requested_locales = match header.is_some() {
        true => parse(header.unwrap().to_str().unwrap()),
        false => vec![String::from("en-GB")],
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

    let locale = negotiated[0];
    let path = format!("/{}", locale);

    Redirect::temporary(path.as_str())
}
