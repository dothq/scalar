import { formatString, Locale } from "@utils/l10n";
import Head from "next/head";
import { css } from "stitches.config";
import Navbar from "../Navbar";

const Layout = ({
	children,
	title,
	useLocaleTitleTem,
	items,
	locale,
	canonicalURL,
	loadedLocales
}: {
	children: any;
	title: string;
	useLocaleTitleTem: boolean;
	items: Parameters<typeof Navbar>[0]["items"];
	locale: string;
	canonicalURL: string;
	loadedLocales: Locale[];
}) => {
	return (
		<>
			<Head>
				<title>
					{useLocaleTitleTem
						? formatString(locale)(
								"page-title-template",
								{
									title
								}
						  )
						: title}
				</title>

				<link
					rel="alternate"
					hrefLang="x-default"
					href={canonicalURL}
				></link>

				{loadedLocales.map((l) => (
					<link
						key={l.code}
						rel="alternate"
						hrefLang={l.code}
						href={`${canonicalURL}/${l.code}`}
						title={l.name}
					></link>
				))}
			</Head>

			<div
				id={"a11y-panel"}
				className={css({
					background: "$white",
					bb: "1px solid $black",
					"&:not(:focus-within), &:focus": {
						clip: "rect(1px,1px,1px,1px)",
						overflow: "hidden",
						opacity: 0,
						height: 0
					}
				})()}
			>
				<div
					className={css({
						display: "flex",
						flexDirection: "column",
						padding: "3rem",
						gap: "$3",
						"& > *": {
							width: "max-content"
						}
					})()}
				>
					<h2>Accessibility options</h2>

					<a
						className={"skip-to-main"}
						href={"#main-content"}
						tabIndex={0}
					>
						Skip to main content
					</a>
				</div>
			</div>

			<Navbar items={items} />
			<main id="main-content">{children}</main>
		</>
	);
};

export default Layout;
