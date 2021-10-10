import React from "react"
import { Giscus } from "@giscus/react"
import { useRouter } from "next/router";

export const Comments = () => {
    const [visible, setVisible] = React.useState(0);
    const [base, setBase] = React.useState("");

    const { asPath } = useRouter();
    const { pathname } = new URL(asPath, "http://localhost");

    React.useEffect(() => {
        setBase(`${window.location.protocol}//${window.location.host}`)

        setInterval(() => {
            if(visible !== 0) return;

            const domain: any = window.location.host.match(/[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/);

            if(domain && domain[0] == "dothq.co") setVisible(1);
            else setVisible(2);
        }, 10)

        setTimeout(() => {
            const url = new URL(window.location.href);

            url.searchParams.delete("giscus");

            window.history.replaceState({}, document.title, url.href);
        }, 1000);
    }, [])

    return (
        <div className={"border-t border-gray6 py-8 mt-4 max-w-4xl"}>
            {visible == 0 && <>Loading comments...</>}

            {visible == 1 && <Giscus
                repo="dothq-comments/www"
                repoId="R_kgDOGMMIZg"
                category="Comments"
                categoryId="DIC_kwDOGMMIZs4B_XUH"
                mapping="specific"
                term={pathname}
                reactionsEnabled={"0"}
                emitMetadata={"0"}
                theme={`${base}/api/giscus/index.css` as any}
            />}

            {visible == 2 && <>Comments are disabled in this environment.</>}
        </div>
    )
}