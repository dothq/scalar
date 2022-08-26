import { styled } from "stitches.config";

export const Flex = styled("div", {
	display: "flex",
	flex: 1,
	flexDirection: "$$dir",

	variants: {
		dir: {
			col: {
				$$dir: "column"
			},
			row: {
				$$dir: "row"
			}
		},
		align: {
			start: {
				alignItems: "flex-start",
				textAlign: "left"
			},
			middle: {
				alignItems: "center",
				textAlign: "center"
			},
			end: {
				alignItems: "flex-end",
				textAlign: "right"
			}
		},
		justify: {
			between: {
				justifyContent: "space-between"
			},
			start: {
				justifyContent: "flex-start"
			},
			middle: {
				justifyContent: "center"
			},
			end: {
				justifyContent: "flex-end"
			}
		},
		space: {
			1: {
				gap: "$space$1"
			},
			2: {
				gap: "$space$2"
			},
			3: {
				gap: "$space$3"
			},
			4: {
				gap: "$space$4"
			},
			5: {
				gap: "$space$5"
			},
			6: {
				gap: "$space$6"
			},
			7: {
				gap: "$space$7"
			},
			8: {
				gap: "$space$8"
			},
			9: {
				gap: "$space$9"
			},
			10: {
				gap: "$space$10"
			},
			11: {
				gap: "$space$11"
			},
			12: {
				gap: "$space$12"
			}
		}
	}
});

export const Stack = styled(Flex, {
	$$dir: "column"
});
