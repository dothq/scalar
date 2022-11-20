/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const BrowserWireframe = () => {
	return (
		<svg
			width="1280"
			height="584"
			viewBox="0 0 1280 584"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g opacity="0.5">
				<path
					opacity="0.7"
					d="M24.5434 102.5C25.3198 89.1149 36.4203 78.5 50 78.5H1230C1243.58 78.5 1254.68 89.1149 1255.46 102.5H24.5434Z"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<path
					opacity="0.5"
					d="M48.5 85C48.5 67.0507 63.0507 52.5 81 52.5H1199C1216.95 52.5 1231.5 67.0507 1231.5 85V102.5H48.5V85Z"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<path
					opacity="0.3"
					d="M72.5 60C72.5 42.0507 87.0507 27.5 105 27.5H1175C1192.95 27.5 1207.5 42.0507 1207.5 60V102.5H72.5V60Z"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<path
					opacity="0.1"
					d="M97.5 34C97.5 16.0507 112.051 1.5 130 1.5H1150C1167.95 1.5 1182.5 16.0507 1182.5 34V102.5H97.5V34Z"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<mask id="mask" fill="white">
					<path d="M0 135C0 116.222 15.2223 101 34 101H1246C1264.78 101 1280 116.222 1280 135V584H0V135Z" />
				</mask>
				<path
					d="M-3 135C-3 114.565 13.5655 98 34 98H1246C1266.43 98 1283 114.565 1283 135H1277C1277 117.879 1263.12 104 1246 104H34C16.8792 104 3 117.879 3 135H-3ZM1280 584H0H1280ZM-3 584V135C-3 114.565 13.5655 98 34 98V104C16.8792 104 3 117.879 3 135V584H-3ZM1246 98C1266.43 98 1283 114.565 1283 135V584H1277V135C1277 117.879 1263.12 104 1246 104V98Z"
					fill="url(#gradient)"
					mask="url(#mask)"
				/>
				<path
					d="M2 194H75.5C86.5457 194 95.5 185.046 95.5 174V137C95.5 125.954 104.454 117 115.5 117H401.5C412.546 117 421.5 125.954 421.5 137V174C421.5 185.046 430.454 194 441.5 194H1278.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="440.5"
					y="131.5"
					width="45"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="24.5"
					y="218.5"
					width="45"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="95.5"
					y="218.5"
					width="45"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="166.5"
					y="218.5"
					width="45"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="1210.5"
					y="218.5"
					width="45"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="369.5"
					y="218.5"
					width="541"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<path
					d="M1278 288H114C102.954 288 94 296.954 94 308V584"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="24.5"
					y="289.5"
					width="45"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="24.5"
					y="360.5"
					width="45"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
				<rect
					x="24.5"
					y="431.5"
					width="45"
					height="45"
					rx="13.5"
					stroke="url(#gradient)"
					stroke-width="3"
				/>
			</g>
			<defs>
				<linearGradient
					id="gradient"
					x1="640"
					y1="77"
					x2="640"
					y2="104"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-opacity="0.5" />
					<stop
						offset="1"
						stop-color="#000B1B"
						stop-opacity="0.47"
					/>
				</linearGradient>
			</defs>
		</svg>
	);
};

export default BrowserWireframe;
