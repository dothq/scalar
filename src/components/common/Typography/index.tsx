import { CSS, VariantProps } from "@stitches/react";
import { styled } from "stitches.config";

export const ParagraphStyles = {
	fontSize: "$base",
	fontWeight: "$medium",
	lineHeight: "$base",
	color: "$paragraphColor"
};

const StyledTypography = styled("span", {
	fontSize: "$$fontSize",
	lineHeight: "calc($$fontSize + $$fontSize / 5)",

	variants: {
		__type: {
			h1: {
				$$fontSize: "$fontSizes$xxl",
				lineHeight: "96px",
				fontWeight: "$extrabold"
			},
			h2: {
				$$fontSize: "$fontSizes$xl",
				fontWeight: "$extrabold"
			},
			h3: {
				$$fontSize: "$fontSizes$lg",
				fontWeight: "$bold"
			},
			h4: {
				$$fontSize: "$fontSizes$md",
				fontWeight: "$medium"
			},
			p: {
				...ParagraphStyles
			}
		}
	}
});

interface TypographyProps {
	children?: any;
	as: VariantProps<typeof StyledTypography>["__type"];
	css?: CSS;
}

export const Typography = ({
	as,
	children,
	...props
}: TypographyProps & VariantProps<typeof StyledTypography>) => {
	return (
		<StyledTypography
			as={as as any}
			__type={as as any}
			{...props}
		>
			{children}
		</StyledTypography>
	);
};
