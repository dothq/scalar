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

use std::process::Command;

use crate::server::start_https_server;

#[tokio::main]
async fn main() {
    std::env::var("SCALAR_ALLOWED_ORIGINS")
        .expect("Environment variable 'SCALAR_ALLOWED_ORIGINS' is required. Expects: comma separated hostnames");

    let revision_process = Command::new("git")
        .arg("rev-parse")
        .arg("HEAD")
        .output()
        .expect("Failed to obtain Git revision.");

    let revision = String::from_utf8(revision_process.stdout).unwrap();

    std::env::set_var("SCALAR_REVISION", revision.trim());

    start_https_server().await;
}
