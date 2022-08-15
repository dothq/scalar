import { styled } from "stitches.config";

const lightVariant = {
	backgroundColor: "$gray6",
	transition: "0.15s background-color",
	"&:hover": {
		backgroundColor: "$gray5"
	}
};

const darkVariant = {
	backgroundColor: "$gray1",
	transition: "0.15s background-color",
	"&:hover": {
		backgroundColor: "$gray2"
	}
};

const Logo = styled("i", {
	borderRadius: "1000px",

	defaultVariants: {
		color: "theme",
		size: "md"
	},

	variants: {
		color: {
			theme: {
				...lightVariant,
				"@media (prefers-color-scheme: dark)": {
					...darkVariant
				}
			},
			light: lightVariant,
			dark: darkVariant
		},
		size: {
			sm: {
				size: 24
			},
			md: {
				size: 40
			},
			lg: {
				size: 56
			}
		}
	}
});

export default Logo;
