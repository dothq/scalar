import { createStitches } from "@stitches/react";

export const {
	styled,
	css,
	globalCss,
	keyframes,
	getCssText,
	theme,
	createTheme,
	config
} = createStitches({
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
			3: "14px",
			4: "16px",
			5: "24px",
			6: "36px",
			7: "48px",
			8: "64px",
			9: "72px",
			10: "96px",
			11: "124px",
			12: "200px"
		},
		fontSizes: {
			sm: "12px",
			base: "16px",
			md: "24px",
			lg: "32px",
			xl: "64px",
			xxl: "96px"
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
		lineHeights: {
			base: 1.5
		},
		letterSpacings: {
			base: -0.5
		},
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
		linearGradient: (value: any) => ({
			background: `linear-gradient(${value})`
		}),

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
