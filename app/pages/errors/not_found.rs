/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use crate::utils::templates::{HtmlTemplate, TemplateContextProvider};
use askama::Template;
use axum::{
    http::{Request, StatusCode},
    response::{IntoResponse, Response},
};

#[derive(Template)]
#[template(path = "pages/errors/not_found.html")]
struct NotFoundTemplate {
    ctx: TemplateContextProvider,
}

pub async fn not_found<B>(req: Request<B>) -> impl IntoResponse {
    let ctx = TemplateContextProvider::new(req).await;

    let template = NotFoundTemplate { ctx };

    (StatusCode::NOT_FOUND, HtmlTemplate(template))
}

pub async fn return_404<B>(req: Request<B>) -> Response {
    not_found(req).await.into_response()
}
