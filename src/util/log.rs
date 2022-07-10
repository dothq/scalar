#[macro_export] macro_rules! info {
    () => {{
        
    }};

    ( $($args:tt)* ) => {{
        use simple_colors::{ blue, bold };

        let string = format_args!($($args)*).to_string();

        println!("{} {}", blue!(bold!("info")), string);
    }};
}

#[macro_export] macro_rules! error {
    () => {{
        
    }};

    ( $($args:tt)* ) => {{
        use simple_colors::{ red, bold };

        let string = format_args!($($args)*).to_string();

        eprintln!("{} {}", red!(bold!("error")), string);
    }};
}

#[macro_export] macro_rules! warn {
    () => {{
        
    }};

    ( $($args:tt)* ) => {{
        use simple_colors::{ yellow, bold };

        let string = format_args!($($args)*).to_string();

        println!("{} {}", yellow!(bold!("warn")), string);
    }};
}

#[macro_export] macro_rules! success {
    () => {{
        
    }};

    ( $($args:tt)* ) => {{
        use simple_colors::{ green, bold };

        let string = format_args!($($args)*).to_string();

        println!("{} {}", green!(bold!("success")), string);
    }};
}