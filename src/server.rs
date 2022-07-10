use std::error;
use std::net::SocketAddr;

use hyper::Server;
use routerify::RouterService;

use crate::{error, success};
use crate::router::router;

pub async fn start_server(address: String, port: u16) {
    let router = router();

    let service = RouterService::new(router).unwrap();

    let addr = format!("{}:{}", address, port)
        .parse::<SocketAddr>()
        .expect("Failed to parse as address.");

    let server = Server::bind(&addr).serve(service);

    success!("Server ready at http://{}:{}", address, port);

    if let Err(err) = server.await {
        error!("Encountered an error when trying to start the server:");
        error!("{}.", err.to_string());
    }
}