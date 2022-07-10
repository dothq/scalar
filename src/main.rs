mod server;
mod util;
mod router;

use std::env;

use server::start_server;

#[tokio::main]
async fn main() {
    let address = env::var("ADDRESS")
        .unwrap_or_else(|_| { 
            String::from("127.0.0.1") 
        }); 

    let port = env::var("PORT")
        .unwrap_or_else(|_| { 
            String::from("3000") 
        })
        .parse::<u16>()
        .expect("Failed to parse port.");

    let app = start_server(address.to_string(), port);
    app.await;
}
