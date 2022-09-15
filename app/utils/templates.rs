/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use askama::Template;
use axum::{
    http::StatusCode,
    response::{Html, IntoResponse, Response},
};

impl<T> IntoResponse for HtmlTemplate<T>
where
    T: Template,
{
    fn into_response(self) -> Response {
        let rendered = self.0.render();

        match rendered {
            Ok(html) => Html(html).into_response(),
            Err(err) => {
                println!("Failed to render template. Error: {}", err);

                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "Failed to render template.".to_string(),
                )
                    .into_response()
            }
        }
    }
}

pub struct HtmlTemplate<T>(pub T);
