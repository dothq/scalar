import Head from "next/head";
import { css } from "stitches.config";
import Navbar from "../Navbar";

const Layout = ({
	children,
	title,
	useLocaleTitleTem,
	items,
	locale
}: {
	children: any;
	title: string;
	useLocaleTitleTem: boolean;
	items: Parameters<typeof Navbar>[0]["items"];
	locale: string;
}) => {
	return (
		<>
			<Head>
				<title>
					{useLocaleTitleTem
						? `${title} — Dot HQ (UK)`
						: title}
				</title>
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
