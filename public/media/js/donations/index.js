/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const $ = (...args) => document.querySelector(args);
const $$ = (...args) => document.querySelectorAll(args);

const inputState = new Map();
const paymentState = new Map();

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

const formattedCurrency = (num) => {
	return num.toLocaleString(document.documentElement.lang, {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2
	});
};

const updateURL = () => {
	const url = new URL(window.location.href);

	paymentState.forEach((v, k) => {
		url.searchParams.set(k, v);
	});

	window.history.replaceState(
		{},
		"",
		url.href.split(url.origin)[1]
	);
};

// Reset inputs
$("#custom_amount_input").value = "";

$("#currency_input").addEventListener("change", (e) => {
	paymentState.set("currency", e.target.value);
	updateURL();
});

$("#custom_amount_input").addEventListener("blur", (e) => {
	if (!e.target.value.length) return;

	const value = e.target.value;
	const parsed = parseFloat(value);

	if (!(+value === +value)) {
		return setError(
			e.target,
			"Invalid donation amount, should be a number."
		);
	}

	inputState.set(e.target, parsed);

	e.target.value = formattedCurrency(parsed);

	const hardLimit = parseFloat(
		window.SCALAR_DONATION_CONFIG.donation_hard_limit
	);

	if (parsed >= hardLimit) {
		return setError(
			e.target,
			`Sorry, we cannot process any donations over ${formattedCurrency(
				hardLimit
			)} at the moment.`
		);
	} else {
		removeError(e.target);
	}

	$(".donate-amounts-grid")
		.querySelectorAll(".fdn-button.red.primary")
		.forEach((b) => {
			if (b.classList.contains("primary")) {
				b.classList.replace("primary", "secondary");
			}
		});

	paymentState.set("amount", parsed);
	updateURL();
});

$("#custom_amount_input").addEventListener("focus", (e) => {
	if (inputState.has(e.target)) {
		e.target.value = inputState.get(e.target);
	}
});

const allButtonsInGrid = Array.from(
	$(".donate-amounts-grid").querySelectorAll(".fdn-button.red")
);

allButtonsInGrid.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		allButtonsInGrid.map((btn) =>
			btn.classList.replace("primary", "secondary")
		);

		e.target.classList.replace("secondary", "primary");

		paymentState.set(
			"amount",
			parseFloat(e.target.getAttribute("data-amount"))
		);
	});
});

$$(".donate-flow-form").forEach((f) =>
	f.addEventListener("submit", (e) => {
		e.preventDefault();
		e.stopPropagation();
	})
);
