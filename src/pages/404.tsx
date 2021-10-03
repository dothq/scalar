import { Error } from "../components/Error";

const NotFound = () => {
    return (
        <Error 
            code={404} 
            buttonClick={() => window.history.back()} 
            buttonHref={"/"} 
        />
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    if(locale == "en") locale = "en-GB";

    return {
        props: {
            messages: require(`../l10n/${locale}.json`),
        }
    };
}

export default NotFound;