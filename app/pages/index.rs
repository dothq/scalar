/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use std::collections::HashMap;

use askama::Template;
use axum::response::IntoResponse;

use crate::utils::templates::HtmlTemplate;

#[derive(Template)]
#[template(path = "index.html")]
struct LandingTemplate {
    l: HashMap<String, String>,
}

pub async fn index() -> impl IntoResponse {
    let mut stub = HashMap::new();
    stub.insert("hello-world".to_string(), "Hello world!".to_string());

    let template = LandingTemplate { l: stub };

    HtmlTemplate(template)
}
