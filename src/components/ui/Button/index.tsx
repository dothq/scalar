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
			dark: darkVariant,
			red: {
				$$bgcolor: "$colors$red",
				$$textcolor: "$colors$white"
			},
			orange: {
				$$bgcolor: "$colors$orange",
				$$textcolor: "$colors$white"
			},
			yellow: {
				$$bgcolor: "$colors$yellow",
				$$textcolor: "$colors$black"
			},
			green: {
				$$bgcolor: "$colors$green",
				$$textcolor: "$colors$white"
			},
			aqua: {
				$$bgcolor: "$colors$aqua",
				$$textcolor: "$colors$white"
			},
			blue: {
				$$bgcolor: "$colors$blue",
				$$textcolor: "$colors$white"
			},
			pink: {
				$$bgcolor: "$colors$pink",
				$$textcolor: "$colors$white"
			},
			violet: {
				$$bgcolor: "$colors$violet",
				$$textcolor: "$colors$white"
			},
			gray1: {
				$$bgcolor: "$colors$gray1",
				$$textcolor: "$colors$black"
			},
			gray2: {
				$$bgcolor: "$colors$gray2",
				$$textcolor: "$colors$black"
			},
			gray3: {
				$$bgcolor: "$colors$gray3",
				$$textcolor: "$colors$white"
			},
			gray4: {
				$$bgcolor: "$colors$gray4",
				$$textcolor: "$colors$white"
			},
			gray5: {
				$$bgcolor: "$colors$gray5",
				$$textcolor: "$colors$white"
			},
			gray6: {
				$$bgcolor: "$colors$gray6",
				$$textcolor: "$colors$white"
			},
			white: {
				$$bgcolor: "$colors$white",
				$$textcolor: "$colors$black"
			},
			black: {
				$$bgcolor: "$colors$black",
				$$textcolor: "$colors$white"
			}
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

interface ButtonProps extends VariantProps<typeof StyledButton> {
	icon?: ReactElement;
	css?: CSS;
	as?: any;
	children?: any;
	href?: string;
	tabIndex?: number;
	ariaLabel: string;
}

export const Button = ({
	icon,
	children,
	href,
	ariaLabel,
	...props
}: ButtonProps) => {
	return (
		<StyledButton
			hasIcon={typeof icon !== "undefined"}
			aria-label={ariaLabel}
			href={href}
			{...props}
		>
			<ButtonLabel>{children}</ButtonLabel>
		</StyledButton>
	);
};
