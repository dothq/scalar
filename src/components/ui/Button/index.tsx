import { CSS, VariantProps } from "@stitches/react";
import { ReactElement } from "react";
import { styled } from "stitches.config";

const lightVariant = {
	$$bgcolor: "$colors$gray6",
	$$textcolor: "$colors$gray1"
};

const darkVariant = {
	$$bgcolor: "$colors$gray1",
	$$textcolor: "$colors$gray6"
};

const StyledButton = styled("a", {
	display: "flex",
	borderRadius: "1000px",
	textDecoration: "none",
	userSelect: "none",
	width: "fit-content",
	height: "fit-content",
	transition: "0.2s background-color, color linear",
	position: "relative",

	defaultVariants: {
		color: "theme",
		hasIcon: false,
		size: "md"
	},

	"&::before": {
		content: "",
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "$$bgcolor",
		inset: 0,
		borderRadius: "inherit",
		transition: "0.05s opacity linear",
		opacity: 0
	},

	backgroundColor: "$$bgcolor",
	border: "2px solid $$bgcolor",
	color: "$$textcolor",
	"&:hover,&:active": {
		backgroundColor: "transparent",
		color: "$$bgcolor"
	},
	"&:active::before": {
		opacity: 0.1
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
		hasIcon: {
			true: {
				px: "$$paddingY"
			}
		},
		size: {
			sm: {
				$$paddingY: "$space$2",
				py: "$$paddingY",
				px: "$6"
			},
			md: {
				$$paddingY: "$space$3",
				py: "$$paddingY",
				px: "$6"
			},
			lg: {
				$$paddingY: "$space$4",
				py: "$$paddingY",
				px: "$6"
			}
		}
	}
});

export const ButtonLabel = styled("label", {
	zIndex: 1,
	fontSize: "$md",
	fontWeight: "$extrabold",
	color: "inherit",
	transition: "0.05s color linear"
});

interface ButtonProps {
	icon?: ReactElement;
	children?: any;
	css?: CSS;
}

export const Button = ({
	icon,
	children,
	...props
}: ButtonProps & VariantProps<typeof StyledButton>) => {
	return (
		<StyledButton
			hasIcon={typeof icon !== "undefined"}
			{...props}
		>
			<ButtonLabel>{children}</ButtonLabel>
		</StyledButton>
	);
};
