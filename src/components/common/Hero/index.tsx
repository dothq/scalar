import { styled } from "stitches.config";

export const Hero = styled("section", {
	display: "flex",
	width: "100%",
	justifyContent: "center",

	variants: {
		size: {
			sm: {
				$$heroSize: "$space$3"
			},
			md: {
				$$heroSize: "$space$6"
			},
			lg: {
				$$heroSize: "$space$9"
			}
		},
		color: {
			red: { bg: "$red", color: "$white" },
			orange: { bg: "$orange", color: "$white" },
			yellow: { bg: "$yellow", color: "$black" },
			green: { bg: "$green", color: "$white" },
			aqua: { bg: "$aqua", color: "$white" },
			blue: { bg: "$blue", color: "$white" },
			pink: { bg: "$pink", color: "$white" },
			violet: { bg: "$violet", color: "$white" },
			gray1: { bg: "$gray1", color: "$black" },
			gray2: { bg: "$gray2", color: "$black" },
			gray3: { bg: "$gray3", color: "$white" },
			gray4: { bg: "$gray4", color: "$white" },
			gray5: { bg: "$gray5", color: "$white" },
			gray6: { bg: "$gray6", color: "$white" },
			white: { bg: "$white", color: "$black" },
			black: { bg: "$black", color: "$white" }
		}
	}
});

export const HeroContainer = styled("div", {
	py: "$$heroSize",
	maxWidth: "1100px",
	width: "100%",
	display: "flex"
});
