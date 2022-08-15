const Home = ({ locale }: { locale: string }) => {
	return <h1>Hello</h1>;
};

export const getServerSideProps = () => {
	return {
		props: {
			title: "Privacy for all"
		}
	};
};

export default Home;
