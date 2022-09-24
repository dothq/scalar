/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use crate::l10n::L10nProvider;
use askama::Template;
use axum::{
    http::{Request, StatusCode},
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

#[allow(dead_code)]
pub struct TemplateContextProvider {
    pub l: L10nProvider,
}

#[allow(dead_code)]
impl TemplateContextProvider {
    pub async fn new<B>(req: Request<B>) -> Self {
        let l10n = L10nProvider::new::<B>(req).await;

        TemplateContextProvider { l: l10n }
    }
}
