/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use askama::Template;
use axum::response::IntoResponse;

use crate::utils::templates::HtmlTemplate;

#[derive(Template)]
#[template(path = "index.html")]
struct LandingTemplate {}

pub async fn index() -> impl IntoResponse {
    let template = LandingTemplate {};

    HtmlTemplate(template)
}
