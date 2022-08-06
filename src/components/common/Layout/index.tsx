import Navbar from "../Navbar";

const Layout = ({
	children,
	items
}: {
	children: any;
	items: Parameters<typeof Navbar>[0]["items"];
}) => {
	return (
		<>
			<Navbar items={items} />
			<main id="main-content">{children}</main>
		</>
	);
};

export default Layout;
