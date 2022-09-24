/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use askama::Template;
use axum::{http::Request, response::IntoResponse};

use crate::utils::templates::{HtmlTemplate, TemplateContextProvider};

#[derive(Template)]
#[template(path = "pages/about.html")]
struct AboutTemplate {
    ctx: TemplateContextProvider,
}

pub async fn about<B>(req: Request<B>) -> impl IntoResponse {
    let ctx = TemplateContextProvider::new(req).await;

    let template = AboutTemplate { ctx };

    HtmlTemplate(template)
}
