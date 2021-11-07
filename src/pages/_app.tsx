import React from "react";

import type { AppProps } from "next/app"
import { NextIntlProvider } from "next-intl";

import { LoadEvent } from "../events/load";

import "../../styles/global.css";
import "../../styles/app.css";
import "../../styles/blog.css";
import "../../styles/focus.css";
import { UserProvider } from "@auth0/nextjs-auth0";

const Application = ({ Component, pageProps }: AppProps) => {
    React.useEffect(() => {
        window.addEventListener("load", () => new LoadEvent());
    }, [])

    return (
        <NextIntlProvider messages={pageProps.messages}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </NextIntlProvider>
    )
}

export default Application;
