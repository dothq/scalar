import { GetServerSidePropsContext } from "next";

/* noop */
const Home = () => {};

export const getServerSideProps = ({ req, res }: GetServerSidePropsContext) => {
	res.statusCode = 307;
	res.setHeader("Location", "/en-GB");
	res.write("");
	res.end();

	return {
		props: {}
	};
};

export default Home;
