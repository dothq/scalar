import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
	createStitches({
		theme: {
			colors: {
				red: "#FE5C5C",
				orange: "#FB8D28",
				yellow: "#F4DE12",
				green: "#0ED139",
				aqua: "#5CC4FE",
				blue: "#1662D3",
				pink: "#FE5CF7",
				violet: "#B75CFE",
				white: "#EFF5FF",
				black: "#000B1B"
			},
			space: {
				1: "4px",
				2: "8px",
				3: "12px",
				4: "14px",
				5: "16px",
				6: "18px",
				7: "20px",
				8: "24px",
				9: "28px",
				10: "32px",
				12: "36px",
				13: "40px",
				14: "44px",
				15: "48px",
				16: "52px",
				17: "56px",
				18: "62px",
				19: "72px",
				20: "86px",
				21: "96px",
				22: "108px",
				23: "124px",
				24: "172px",
				25: "200px"
			},
			fontSizes: {
				1: "12px",
				2: "16px",
				3: "18px",
				4: "20px",
				5: "22px",
				6: "24px",
				7: "28px",
				8: "32px",
				9: "36px",
				10: "44px",
				11: "52px",
				12: "64px",
				13: "72px",
				14: "84px",
				15: "92px",
				16: "104px",
				17: "112px",
				18: "124px"
			},
			fonts: {
				sans: [
					"Satoshi",
					"-apple-system",
					"BlinkMacSystemFont",
					'"Segoe UI"',
					"Helvetica",
					"Arial",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"'
				].join(", "),
				mono: "monospace"
			},
			fontWeights: {},
			lineHeights: {},
			letterSpacings: {},
			sizes: {},
			borderWidths: {},
			borderStyles: {},
			radii: {},
			shadows: {},
			zIndices: {},
			transitions: {}
		},
		media: {
			sm: "(min-width: 640px)",
			md: "(min-width: 824px)",
			lg: "(min-width: 1100px)",
			xl: "(min-width: 1460px)",
			xl2: "(min-width: 1920px)"
		},
		utils: {
			// Borders
			b: (value: string) => ({ border: value }),
			bt: (value: string) => ({ borderTop: value }),
			br: (value: string) => ({ borderRight: value }),
			bb: (value: string) => ({ borderBottom: value }),
			bl: (value: string) => ({ borderL: value }),
			r: (value: number) => ({ borderRadius: value }),

			// Backgrounds
			bg: (value: any) => ({ background: value }),
			linearGradient: (value: any) => ({ background: `linear-gradient(${value})` }),

			// Proportions
			size: (value: number) => ({
				width: value,
				height: value
			}),

			// Margin & padding
			mt: (value: number) => ({ marginInlineStart: value }),
			mb: (value: number) => ({ marginInlineEnd: value }),
			ml: (value: number) => ({ marginBlockStart: value }),
			mr: (value: number) => ({ marginBlockEnd: value }),

			pt: (value: number) => ({ paddingInlineStart: value }),
			pb: (value: number) => ({ paddingInlineEnd: value }),
			pl: (value: number) => ({ paddingBlockStart: value }),
			pr: (value: number) => ({ paddingBlockEnd: value }),

			mx: (value: number) => ({ ml: value, mr: value }),
			my: (value: number) => ({ mt: value, mb: value }),

			px: (value: number) => ({ pl: value, pr: value }),
			py: (value: number) => ({ pt: value, pb: value })
		}
	});
