import { Button } from "@components/ui/Button";
import Link from "@components/ui/Link";
import Logo from "@components/ui/Logo";
import {
	NavbarContainer,
	NavbarGutter,
	NavbarItem,
	StyledNavbar
} from "./style";

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
				<NavbarGutter side={"left"}>
					<Logo as={Link} href={"/"} />
				</NavbarGutter>

				<NavbarGutter
					side={"center"}
					as={"ul"}
					css={{
						flexDirection: "row",
						gap: "3.5rem",
						listStyle: "none"
					}}
				>
					{items &&
						items.map((i) => (
							<li key={i.id}>
								<NavbarItem href={i.href || "#"}>
									{i.name}
								</NavbarItem>
							</li>
						))}
				</NavbarGutter>

				<NavbarGutter side={"right"}>
					<Button>Donate</Button>
				</NavbarGutter>
			</NavbarContainer>
		</StyledNavbar>
	);
};

Navbar.metadata = {
	name: "Navbar"
};

export default Navbar;
