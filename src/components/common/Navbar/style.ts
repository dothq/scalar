import Link from "@components/ui/Link";
import { styled } from "stitches.config";

export const StyledNavbar = styled("nav", {
	width: "100%",
	height: "160px"
});

export const NavbarContainer = styled("div", {
	"@lg": {
		width: "1100px"
	},
	display: "flex",
	margin: "0 auto",
	height: "100%"
});

export const NavbarGutter = styled("div", {
	flex: "1 1",
	display: "flex",
	alignItems: "center",

	variants: {
		side: {
			left: {
				justifyContent: "flex-start"
			},
			center: {
				justifyContent: "center"
			},
			right: {
				justifyContent: "flex-end"
			}
		}
	}
});

export const NavbarItem = styled(Link, {
	fontSize: "$md",
	fontWeight: "$medium",
	textDecoration: "none"
});
