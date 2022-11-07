/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const $ = (...args) => document.querySelector(args);
const $$ = (...args) => document.querySelectorAll(args);

const inputState = new Map();
const paymentState = new Map();

new URL(window.location.href).searchParams.forEach((v, k) => {
	if (k == "amount") {
		v = parseFloat(v);
	}

	paymentState.set(k, v);
});

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

const getPriceInCurrency = (amount, currency) => {
	const currencyExchangeRate =
		window.SCALAR_DONATION_CONFIG.fiat.currencies
			.concat(window.SCALAR_DONATION_CONFIG.crypto.currencies)
			.find((c) => c.id == currency).rate;

	return amount * currencyExchangeRate;
};

const updateURL = () => {
	const url = new URL(window.location.href);

	paymentState.forEach((v, k) => {
		console.log(v, k);
		url.searchParams.set(k, v.toString());
	});

	window.history.replaceState(
		{},
		"",
		url.href.split(url.origin)[1]
	);
};

const allAmountsInGrid = Array.from(
	$(".donate-amounts-grid").querySelectorAll(".fdn-button.red")
);

const setAmount = (index, value) => {
	allAmountsInGrid.forEach((btn, i) => {
		if (index == i) {
			btn.classList.replace("secondary", "primary");
			paymentState.set(
				"amount",
				parseFloat(btn.getAttribute("data-amount"))
			);
		} else {
			btn.classList.replace("primary", "secondary");
		}
	});

	if (index == -1) {
		$("#custom_amount_input").value = formattedCurrency(
			value ? parseFloat(value) : paymentState.get("amount")
		);

		paymentState.set(
			"amount",
			value ? parseFloat(value) : paymentState.get("amount")
		);
	} else {
		$("#custom_amount_input").value = "";
		inputState.set($("#custom_amount_input"), "");
		removeError($("#custom_amount_input"));
	}

	updateURL();
};

const resetAmount = () => {
	setAmount(window.SCALAR_DONATION_CONFIG.default_amount);
};

// Set inputs
if (
	paymentState.get("amount") &&
	$("#custom_amount_input").value.length !== 0
) {
	inputState.set(
		$("#custom_amount_input"),
		paymentState.get("amount")
	);
	setAmount(-1);
} else {
	$("#custom_amount_input").value = "";
}

$("#currency_input").addEventListener("change", (e) => {
	paymentState.set("currency", e.target.value);
	updateURL();

	window.location.reload();
	// paymentState.set("currency", e.target.value);
	// updateURL();

	// allAmountsInGrid.forEach((am) => {
	// 	const newPrice = getPriceInCurrency(
	// 		parseFloat(am.getAttribute("data-amount")),
	// 		e.target.value
	// 	);

	// 	am.textContent = getPriceInCurrency(
	// 		parseFloat(am.getAttribute("data-amount")),
	// 		e.target.value
	// 	);
	// });

	// removeError($("#custom_amount_input"));
	// $("#custom_amount_input").value = "";

	// resetAmount();
});

$("#custom_amount_input").addEventListener("blur", (e) => {
	if (!e.target.value.length) {
		removeError(e.target);
		inputState.set(e.target, e.target.value);

		return;
	}

	const value = e.target.value.replace(/,/g, "");
	const parsed = parseFloat(value);

	if (!(+value === +value)) {
		return setError(
			e.target,
			"Invalid donation amount, should be a number."
		);
	}

	inputState.set(e.target, parsed);

	e.target.value = formattedCurrency(parsed);

	// @todo this should be calculated based on currency chosen
	const lowestAllowed = paymentState.get("currency")
		? getPriceInCurrency(
				parseFloat(window.SCALAR_DONATION_CONFIG.amounts[0]),
				paymentState.get("currency")
		  )
		: 0;

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
	} else if (parsed < lowestAllowed) {
		return setError(
			e.target,
			`Sorry, to combat fraud the minimum amount for donations is ${formattedCurrency(
				lowestAllowed
			)}.`
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
	setAmount(-1);
	updateURL();
});

$("#custom_amount_input").addEventListener("focus", (e) => {
	if (inputState.has(e.target)) {
		e.target.value = inputState.get(e.target);
	}
});

allAmountsInGrid.forEach((btn, index) => {
	btn.addEventListener("click", (e) => setAmount(index));
});

$$(".donate-flow-form").forEach((f) =>
	f.addEventListener("submit", (e) => {
		e.preventDefault();
		e.stopPropagation();
	})
);
