/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use axum::{http::Request, middleware::Next, response::Response};

pub async fn security_middleware<B>(req: Request<B>, next: Next<B>) -> Result<Response, Response> {
    let mut res = next.run(req).await;

    res.headers_mut().insert(
        "Strict-Transport-Security",
        "max-age=63072000; preload".parse().unwrap(),
    );
    res.headers_mut()
        .insert("X-XSS-Protection", "1; mode=block".parse().unwrap());
    res.headers_mut()
        .insert("X-Frame-Options", "sameorigin".parse().unwrap());
    res.headers_mut()
        .insert("Permissions-Policy", "interest-cohort=()".parse().unwrap());
    res.headers_mut()
        .insert("X-Content-Type-Options", "nosniff".parse().unwrap());
    res.headers_mut()
        .insert("Referrer-Policy", "no-referrer".parse().unwrap());

    if !cfg!(debug_assertions) {
        res.headers_mut()
            .insert("Cache-Control", "max-age=604800".parse().unwrap());
    }

    let rev = std::env::var("SCALAR_REVISION").unwrap();

    res.headers_mut()
        .insert("X-Git-Revision", rev.parse().unwrap());

    Ok(res)
}
