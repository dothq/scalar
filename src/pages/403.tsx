import { Error } from "../components/Error";

const NoAccess = () => {
    return (
        <Error 
            code={403} 
            buttonClick={() => window.location.reload()} 
            buttonHref={""}
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

export default NoAccess;