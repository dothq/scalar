/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use axum::{
    response::Redirect,
    routing::{any, get},
    Router,
};

macro_rules! redirect {
    ($path: expr) => {{
        any(|| async { Redirect::permanent($path) })
    }};
}

pub fn redirect_router() -> Router {
    /* Routes here will work without /[ab-CD] */
    let router = Router::new().route("/security.txt", redirect!("/.well-known/security.txt"));

    router
}

pub fn localised_router() -> Router {
    use crate::pages::index::index;

    /* All locales will start with the user's locale */
    let router = Router::new().route("/", get(index));

    router
}
