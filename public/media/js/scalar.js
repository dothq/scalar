/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

document.documentElement.classList.remove("no-js");

const menuButton = document.getElementById("menu-button");
const menuClose = document.getElementById("menu-close");

window.addEventListener("hashchange", (e) => {
	const hash = e.newURL.split("#")[1];

	const removeHash = () => {
		history.pushState(
			{},
			"",
			window.location.href.replace(`#${hash}`, "")
		);
	};

	if (hash == "menu-button") {
		menuButton
			.querySelector(".fdn-icon")
			.classList.replace("close", "menu");
		const navbarId = document.querySelector(
			".fdn-navigation-drawer"
		).id;
		menuButton.querySelector("a").href = `#${navbarId}`;

		removeHash();
	} else if (hash.startsWith("navbar-")) {
		menuButton
			.querySelector("a .fdn-icon")
			.classList.replace("menu", "close");
		menuButton.querySelector("a").href = "#menu-button";

		removeHash();
	} else if (hash == "") {
		removeHash();
	}
});
