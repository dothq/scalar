import { allLocales } from "@utils/l10n";
import { GetServerSidePropsContext } from "next";

const Sitemap = () => {};

export const getServerSideProps = async ({
	req,
	res
}: GetServerSidePropsContext) => {
	const locales = await allLocales();

	const host = req.headers.host as string;
	let protocol = /^localhost(:\d+)?$/.test(host)
		? "http:"
		: "https:";

	if (
		req.headers["x-forwarded-proto"] &&
		typeof req.headers["x-forwarded-proto"] === "string"
	) {
		protocol = `${req.headers["x-forwarded-proto"]}:`;
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${locales.map(
			(l) => `<sitemap>
                <loc>${protocol}//${req.headers.host}/${l}/sitemap.xml</loc>
            </sitemap>`
		)}
    </sitemapindex>
    `.trim();

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {}
	};
};

export default Sitemap;
