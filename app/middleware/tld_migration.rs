/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use axum::{
    http::Request,
    middleware::Next,
    response::{IntoResponse, Redirect, Response},
};

pub async fn tld_migration_middleware<B>(
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, Response> {
    let uri = req.uri();
    let host = match uri.host() {
        Some(host) => host,
        _ => "localhost",
    };
    let url = uri.to_string();

    if host.ends_with("dothq.co") {
        let new_url = url.as_str().replace("://dothq.co", "://dothq.org");

        Ok(Redirect::permanent(&new_url).into_response())
    } else {
        Ok(next.run(req).await)
    }
}
