/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use std::convert::Infallible;

use axum::{
    body::Body,
    response::Redirect,
    routing::{any, get, MethodRouter},
    Router,
};

use crate::{
    l10n::get_all_locales,
    pages::{about::about, index::index},
};

macro_rules! redirect {
    ($path: expr) => {{
        any(|| async { Redirect::permanent($path) })
    }};
}

/* Routes here will work without /[ab-CD] */
pub fn redirect_router() -> Router {
    let mut router = Router::new();

    let routes = get_routes();
    let locales = get_all_locales();

    for locale in locales {
        for route in &routes {
            let localised_path = format!("/{}{}", locale, route.path.as_str());

            router = router.route(
                &route.path,
                get(move || async move { Redirect::permanent(&localised_path) }),
            );
        }
    }

    /* Overwrite any existing pages */
    router = router.route("/security.txt", redirect!("/.well-known/security.txt"));

    router
}

pub struct ScalarRoute {
    path: String,
    handler: MethodRouter<Body, Infallible>,
}

pub fn get_routes() -> Vec<ScalarRoute> {
    let routes: Vec<ScalarRoute> = vec![
        ScalarRoute {
            path: String::from("/"),
            handler: get(index),
        },
        ScalarRoute {
            path: String::from("/about"),
            handler: get(about),
        },
    ];

    routes
}

pub fn localised_router() -> Router {
    let mut router = Router::new();
    let routes = get_routes();

    for route in routes {
        router = router.route(route.path.as_str(), route.handler);
    }

    router
}
