import { createStitches } from "@stitches/react";

const systemFont = [
	"-apple-system",
	"BlinkMacSystemFont",
	'"Segoe UI"',
	"Helvetica",
	"Arial",
	"sans-serif",
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"'
];

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
			gray1: "#EFF5FF",
			gray2: "#BFC6D1",
			gray3: "#8F97A3",
			gray4: "#5F6876",
			gray5: "#303948",
			gray6: "#000B1B",
			white: "#FFFFFF",
			black: "#000000"
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
			xm: "12px",
			sm: "16px",
			base: "20px",
			md: "24px",
			lg: "32px",
			xl: "64px",
			xxl: "80px"
		},
		fonts: {
			sans: ["Satoshi", ...systemFont].join(", "),
			sansVar: ["Satoshi var", ...systemFont].join(", "),
			mono: "monospace"
		},
		fontWeights: {
			extrathin: 100,
			thin: 200,
			light: 300,
			base: 400,
			medium: 500,
			bold: 600,
			extrabold: 700,
			black: 800
		},
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
		xl2: "(min-width: 1920px)",
		dark: "(prefers-color-scheme: dark)",
		light: "(prefers-color-scheme: light)"
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
		mt: (value: any) => ({ marginBlockStart: value }),
		mb: (value: any) => ({ marginBlockEnd: value }),
		ml: (value: any) => ({ marginInlineStart: value }),
		mr: (value: any) => ({ marginInlineEnd: value }),

		pt: (value: any) => ({ paddingBlockStart: value }),
		pb: (value: any) => ({ paddingBlockEnd: value }),
		pl: (value: any) => ({ paddingInlineStart: value }),
		pr: (value: any) => ({ paddingInlineEnd: value }),

		mx: (value: any) => ({
			marginInlineStart: value,
			marginInlineEnd: value
		}),
		my: (value: any) => ({
			marginBlockStart: value,
			marginBlockEnd: value
		}),

		px: (value: any) => ({
			paddingInlineStart: value,
			paddingInlineEnd: value
		}),
		py: (value: any) => ({
			paddingBlockStart: value,
			paddingBlockEnd: value
		})
	}
});

export const themes = {
	light: {
		colors: {
			background: "$white",
			color: "$gray6",
			paragraphColor: "$gray5",
			border: "$gray1",
			primary: "$gray6"
		}
	},
	dark: {
		colors: {
			background: "$gray6",
			color: "$gray1",
			paragraphColor: "$gray2",
			border: "$gray5",
			primary: "$gray1"
		}
	}
};
