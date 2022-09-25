/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

document.documentElement.classList.remove("no-js");

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
		removeHash();
	} else if (hash.startsWith("navbar-")) {
		removeHash();
	} else if (hash == "") {
		removeHash();
	}
});
