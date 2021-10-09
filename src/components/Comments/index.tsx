import React from "react"
import { Giscus } from "@giscus/react"

export const Comments = () => {
    const [base, setBase] = React.useState("");

    React.useEffect(() => {
        setBase(`${window.location.protocol}//${window.location.host}`)

        setTimeout(() => {
            const url = new URL(window.location.href);

            url.searchParams.delete("giscus");

            window.history.replaceState({}, document.title, url.href);
        }, 1000);
    }, [])

    return (
        <div className={"border-t border-gray6 py-8 mt-4 max-w-4xl"}>
            <Giscus
                repo="dothq/www-blog-comments"
                repoId="R_kgDOGMImpQ"
                category="Comments"
                categoryId="DIC_kwDOGMImpc4B_XL0"
                mapping="pathname"
                reactionsEnabled={"0"}
                emitMetadata={"0"}
                theme={`${base}/api/giscus/index.css` as any}
            />
        </div>
    )
}