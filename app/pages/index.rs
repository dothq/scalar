/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */



use askama::Template;
use axum::{http::Request, response::IntoResponse};


use crate::{
    l10n::{L10nProvider},
    utils::templates::HtmlTemplate,
};

#[derive(Template)]
#[template(path = "pages/index.html")]
struct LandingTemplate {
    l: L10nProvider,
}

pub async fn index<B>(req: Request<B>) -> impl IntoResponse {
    let provider = L10nProvider::new::<B>(req).await;

    let template = LandingTemplate { l: provider };

    HtmlTemplate(template)
}
