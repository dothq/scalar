/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

use axum::body::StreamBody;
use axum::{http::StatusCode, routing::get, Router};
use glob::glob;
use std::env;
use tokio::fs::File;
use tokio_util::io::ReaderStream;

pub fn media() -> Router {
    let media_path = env::current_dir().unwrap().join("public");

    let media_path_str = media_path.to_str().unwrap();

    let mut router = Router::new();

    let files = glob(format!("{}/**/*", media_path_str).as_str()).unwrap();

    for path in files {
        let p = path.unwrap();

        if p.is_file() {
            let file_path = p.as_path().to_str().unwrap().to_owned();
            let http_path = file_path.replace(media_path_str, "").as_str().to_owned();

            router = router.route(
                &http_path,
                get(move || async move {
                    let file = match File::open(&file_path).await {
                        Ok(file) => file,
                        Err(_) => return Err(StatusCode::NOT_FOUND),
                    };

                    let stream = ReaderStream::new(file);
                    let body = StreamBody::new(stream);

                    Ok(body)
                }),
            );
        }
    }

    router
}
