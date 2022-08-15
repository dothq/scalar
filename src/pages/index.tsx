import { negotiateLanguages } from "@fluent/langneg";
import { allLocales, DEFAULT_LOCALE } from "@utils/l10n";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { GetServerSidePropsContext } from "next";

/* noop */
const Home = () => {};

export const getServerSideProps = ({
	req,
	res
}: GetServerSidePropsContext) => {
	const userLocales = parseAcceptLanguage(
		req?.headers["accept-language"]
	);

	const [negotiatedLanguage] = negotiateLanguages(
		userLocales,
		allLocales(),
		{
			strategy: "filtering",
			defaultLocale: DEFAULT_LOCALE
		}
	);

	res.statusCode = 307;
	res.setHeader("Location", `/${negotiatedLanguage}`);
	res.write("");
	res.end();

	return {
		props: {}
	};
};

export default Home;
