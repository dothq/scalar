import Link from "@components/ui/Link";

export type NavbarItem = {
	id: string;
	name: string;
	type: "submenu" | "link";
	href?: string;
	content: string;
};

const Navbar = ({ items }: { items: NavbarItem[] }) => {
	return (
		<nav>
			<ul>
				{items &&
					items.map((i) => (
						<li key={i.id}>
							<Link href={i.href || "#"}>{i.name}</Link>
						</li>
					))}
			</ul>
		</nav>
	);
};

Navbar.metadata = {
	name: "Navbar"
};

export default Navbar;
