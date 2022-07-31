import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
	createStitches({
		theme: {
			colors: {
				gray500: "hsl(206,10%,76%)",
				blue500: "hsl(206,100%,50%)",
				purple500: "hsl(252,78%,60%)",
				green500: "hsl(148,60%,60%)",
				red500: "hsl(352,100%,62%)"
			},
			space: {
				1: "5px",
				2: "10px",
				3: "15px"
			},
			fontSizes: {
				1: "12px",
				2: "13px",
				3: "15px"
			},
			fonts: {
				sans: "Untitled Sans, apple-system, sans-serif",
				mono: "Söhne Mono, menlo, monospace"
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
			bp1: "(min-width: 480px)"
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
