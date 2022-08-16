import { CSS, VariantProps } from "@stitches/react";
import { styled } from "stitches.config";

const StyledTypography = styled("span", {
	variants: {
		type: {
			h1: {
				fontSize: "$xxl",
				fontWeight: "$extrabold"
			},
			h2: {
				fontSize: "$xl",
				fontWeight: "$extrabold"
			},
			h3: {
				fontSize: "$lg",
				fontWeight: "$bold"
			},
			h4: {
				fontSize: "$md",
				fontWeight: "$medium"
			},
			p: {
				fontSize: "$base",
				fontWeight: "$medium",
				color: "$paragraphColor"
			}
		}
	}
});

interface TypographyProps {
	children?: any;
	as: VariantProps<typeof StyledTypography>["type"];
	css?: CSS;
}

export const Typography = ({
	as,
	children,
	...props
}: TypographyProps & VariantProps<typeof StyledTypography>) => {
	return (
		<StyledTypography as={as as any} type={as as any} {...props}>
			{children}
		</StyledTypography>
	);
};
