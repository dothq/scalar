/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use axum::{http::Request, middleware::Next, response::Response};

use crate::{l10n::get_all_locales, pages::errors::not_found::return_404};

pub async fn l10n_middleware<B>(req: Request<B>, next: Next<B>) -> Result<Response, Response> {
    let locale = req.uri().path().split('/').collect::<Vec<&str>>()[1];

    let all_locales = get_all_locales();

    let is_valid_locale = all_locales.into_iter().any(|l| l == locale);

    match is_valid_locale {
        true => Ok(next.run(req).await),
        false => Err(return_404(req).await),
    }
}
