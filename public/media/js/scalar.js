/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

document.documentElement.classList.remove("no-js");

document
	.querySelector("#app-language-switcher select")
	.addEventListener("change", () => {
		document.querySelector("#app-language-switcher").submit();
	});

document.addEventListener("scroll", () => {
	document.documentElement.classList.toggle(
		"header-scroll-threshold",
		window.scrollY >= 100
	);
});

const updateArrowPositions = () => {
	document
		.querySelectorAll(".fdn-header-menu")
		.forEach(menu => {
			const headerItem = menu.parentElement.querySelector(".fdn-header-item");
			const bounds = headerItem.getBoundingClientRect();

			menu.style.setProperty("--arrow-position", `${bounds.width / 2 + 8}px`);
		})
}

document.querySelector(".fdn-header-content").addEventListener("mouseenter", () => {
	updateArrowPositions();
})