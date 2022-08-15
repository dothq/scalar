import Link from "@components/ui/Link";
import Logo from "@components/ui/Logo";
import { NavbarContainer, StyledNavbar } from "./style";

export type NavbarItem = {
	id: string;
	name: string;
	type: "submenu" | "link";
	href?: string;
	content: string;
};

const Navbar = ({ items }: { items: NavbarItem[] }) => {
	return (
		<StyledNavbar>
			<NavbarContainer>
				<Logo as={Link} href={"/"} />

				{items &&
					items.map((i) => (
						<li key={i.id}>
							<Link href={i.href || "#"}>{i.name}</Link>
						</li>
					))}
			</NavbarContainer>
		</StyledNavbar>
	);
};

Navbar.metadata = {
	name: "Navbar"
};

export default Navbar;
