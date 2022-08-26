import { A11yPanel } from "@components/a11y";
import { DEFAULT_LOCALE, formatString, Locale } from "@utils/l10n";
import Head from "next/head";
import React from "react";
import Navbar from "../Navbar";

export const LayoutContext = React.createContext<{
	locale: string;
}>({ locale: DEFAULT_LOCALE });

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
		<LayoutContext.Provider
			value={{
				locale
			}}
		>
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

			<A11yPanel />

			<Navbar items={items} />
			<main id="main-content">{children}</main>
		</LayoutContext.Provider>
	);
};

export default Layout;
