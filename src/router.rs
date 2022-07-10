use std::io;

use hyper::Body;
use routerify::Router;

pub fn router() -> Router<Body, io::Error> {
    Router::builder()
        .build()
        .unwrap()
}