import { allLocales } from "@utils/l10n";
import { getCanonicalURL } from "@utils/url";
import { GetServerSidePropsContext } from "next";

const Sitemap = () => {};

export const getServerSideProps = async ({
	req,
	res
}: GetServerSidePropsContext) => {
	const locales = await allLocales();

	const host = getCanonicalURL(req);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${locales.map(
			(l) => `<sitemap>
                <loc>${host}/${l}/sitemap.xml</loc>
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
