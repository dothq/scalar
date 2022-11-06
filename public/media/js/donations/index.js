/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const $ = (...args) => document.querySelector(args);

const setError = (el, message) => {
	removeError(el);

	const fdnField = el.parentNode.parentNode;

	fdnField.classList.add("has-error");
	fdnField.getElementsByClassName(
		"fdn-input-error"
	)[0].textContent = message;
};

const removeError = (el) => {
	const fdnField = el.parentNode.parentNode;

	fdnField.classList.remove("has-error");
};

const inputState = new Map();

$("#custom_amount_input").addEventListener("blur", (e) => {
	const value = e.target.value;
	const parsed = parseInt(value);

	inputState.set(e.target, parsed);

	e.target.value = parsed.toLocaleString(
		document.documentElement.lang
	);

	if (parsed >= 100_000) {
		setError(
			e.target,
			"Sorry, we cannot process any donations over £100,000 at the moment."
		);
	} else {
		removeError(e.target);
	}
});

$("#custom_amount_input").addEventListener("focus", (e) => {
	if (inputState.has(e.target)) {
		e.target.value = inputState.get(e.target);
	}
});
