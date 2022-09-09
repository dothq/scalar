/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use crate::utils::templates::HtmlTemplate;
use askama::Template;
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};

#[derive(Template)]
#[template(path = "errors/not_found.html")]
struct NotFoundTemplate {}

pub async fn not_found() -> impl IntoResponse {
    let template = NotFoundTemplate {};

    (StatusCode::NOT_FOUND, HtmlTemplate(template))
}

pub async fn return_404() -> Response {
    not_found().await.into_response()
}
