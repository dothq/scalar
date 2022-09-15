/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use axum::{http::{Request, StatusCode}, middleware::Next, response::{Response, IntoResponse}};

pub async fn origin_middleware<B>(req: Request<B>, next: Next<B>) -> Result<Response, (StatusCode, &'static str)> {
    let uri = req.uri();
    let host = match uri.host() {
        Some(host) => host,
        _ => "localhost",
    };

    let allowed_origins_env = std::env::var("SCALAR_ALLOWED_ORIGINS")
        .unwrap();

    let allowed_origins = allowed_origins_env
        .split(",")
        .collect::<Vec<&str>>();

    if host == "localhost" || allowed_origins.contains(&host) {
        Ok(next.run(req).await)
    } else {
        Err((StatusCode::INTERNAL_SERVER_ERROR, ""))
    }
}
 