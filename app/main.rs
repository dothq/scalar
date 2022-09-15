/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#![allow(incomplete_features)]
#![feature(inherent_associated_types)]
#![feature(let_chains)]

mod middleware;
mod pages;
mod utils;

mod l10n;
mod router;
mod server;

use crate::server::start_https_server;

#[tokio::main]
async fn main() {
    start_https_server().await;
}
