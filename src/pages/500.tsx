import React from "react";
import { Error } from "../components/Error";

const InternalServerError = () => {
    return (
        <Error 
            code={500} 
            buttonClick={() => window.location.reload()} 
            buttonHref={""} 
        />
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    try {
        if(locale == "en") locale = "en-GB";

        return {
            props: {
                messages: require(`../l10n/${locale}.json`),
            }
        };
    } catch(e) {
        return {
            props: {
                messages: require(`../l10n/en-GB.json`),
            }
        };
    }
}

export default InternalServerError;