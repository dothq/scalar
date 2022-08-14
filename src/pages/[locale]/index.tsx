const Home = ({ locale }: { locale: string }) => {
	return <h1>hello {locale}</h1>;
};

export const getServerSideProps = () => {
	return {
		props: {
			title: "Privacy for all"
		}
	};
};

export default Home;
