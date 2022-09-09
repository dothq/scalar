/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use axum::handler::Handler;
use axum::routing::any;
use axum::{middleware, Router, Server};
use std::net::SocketAddr;
use tokio::signal;

use crate::l10n::l10n_redirector;
use crate::middleware::l10n::l10n_middleware;
use crate::middleware::tld_migration::tld_migration_middleware;
use crate::pages::errors::not_found::not_found;
use crate::router::{localised_router, redirect_router};
use crate::utils::media::media;

async fn shutdown_signal_handle() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("Failed to install shutdown handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("Failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }

    println!("Performing a graceful shutdown...");
}

pub async fn start_https_server() {
    let app = Router::new()
        /* Normal pages should go in localised_router */
        .nest("/", redirect_router())
        .nest("/:locale", localised_router())
        /* Middleware */
        .route_layer(middleware::from_fn(l10n_middleware))
        .route_layer(middleware::from_fn(tld_migration_middleware))
        /* Initial URL redirection */
        .route("/", any(l10n_redirector))
        /* Media and static assets */
        .merge(media())
        /* 404 page */
        .fallback(not_found.into_service());

    let address = SocketAddr::from(([127, 0, 0, 1], 3000));

    println!("Started application at http://{}", address);

    Server::bind(&address)
        .serve(app.into_make_service())
        .with_graceful_shutdown(shutdown_signal_handle())
        .await
        .unwrap();
}
