import NotFound from "@components/common/NotFound";

const NotFoundPage = ({ components }: { components: any }) => {
	return <NotFound {...components.not_found} />;
};

export default NotFoundPage;
