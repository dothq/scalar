import type { AppProps } from "next/app"
import { NextIntlProvider } from "next-intl";

import "../../styles/global.css";

const Application = ({ Component, pageProps }: AppProps) => {
    return (
        <NextIntlProvider messages={pageProps.messages}>
            <Component {...pageProps} />
        </NextIntlProvider>
    )
}

export default Application;
