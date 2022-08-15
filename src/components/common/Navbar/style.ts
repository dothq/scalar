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
	alignItems: "center",
	margin: "0 auto",
	height: "100%"
});
