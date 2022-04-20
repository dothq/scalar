import { UserProvider } from "@auth0/nextjs-auth0";
import { NextIntlProvider } from "next-intl";
import type { AppProps } from "next/app";
import React from "react";
import "../../styles/app.css";
import "../../styles/blog.css";
import "../../styles/focus.css";
import "../../styles/global.css";
import "../../styles/typography.css";
import { LoadEvent } from "../events/load";




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
