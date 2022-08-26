import { formatString } from "@utils/l10n";
import { useContext } from "react";
import { styled } from "stitches.config";
import { LayoutContext } from "./common/Layout";
import { Typography } from "./common/Typography";
import { Button } from "./ui/Button";

const StyledA11y = styled("div", {
	background: "$bg",
	bb: "1px solid $border",
	"&:not(:focus-within), &:focus": {
		clip: "rect(1px,1px,1px,1px)",
		overflow: "hidden",
		opacity: 0,
		height: 0
	}
});

const A11yContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	padding: "3rem",
	gap: "$3",
	"& > *": {
		width: "max-content"
	}
});

export const A11yPanel = () => {
	const { locale } = useContext(LayoutContext);

	return (
		<StyledA11y
			id={"a11y-panel"}
			aria-label={formatString(locale)("a11y-panel-aria-label")}
		>
			<A11yContainer>
				<Typography as={"h3"}>
					{formatString(locale)("a11y-panel-title")}
				</Typography>

				<Button
					color={"theme"}
					href={"#main-content"}
					tabIndex={0}
					size={"md"}
					ariaLabel={formatString(locale)(
						"a11y-panel-skip-to-main.aria-label"
					)}
				>
					{formatString(locale)("a11y-panel-skip-to-main")}
				</Button>
			</A11yContainer>
		</StyledA11y>
	);
};
