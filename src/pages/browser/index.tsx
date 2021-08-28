import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router"
import React from "react";
import { HollowButton } from "../../components/Button/Hollow";
import { Header } from "../../components/Header";
import Layout from "../../components/Layout";
import { Subheader } from "../../components/Subheader";

const Browser = () => {
    const { locale } = useRouter();

    const t = useTranslations("");

    return (
        <Layout>
            <div className={"w-full flex flex-col h-full md:min-h-screen"}>
                <Header />

                <Subheader id={"browser-desktop"} />
            </div>
        </Layout>
    )
}

export function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            messages: require(`../../l10n/${locale}.json`),
        }
    };
}

export default Browser;