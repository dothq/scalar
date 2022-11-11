/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const $ = (...args) => document.querySelector(args);
const $$ = (...args) => document.querySelectorAll(args);

const allCurrencies = (
	window.SCALAR_DONATION_CONFIG.fiat.enabled
		? window.SCALAR_DONATION_CONFIG.fiat.currencies
		: []
).concat(
	window.SCALAR_DONATION_CONFIG.crypto.enabled
		? window.SCALAR_DONATION_CONFIG.crypto.currencies
		: []
);

const allAmountsInGrid = Array.from(
	$$(".donate-amounts-grid > .fdn-button")
);

const allMethods = Array.from(
	$$("#donate-pay-methods > .fdn-button")
);

const getCookie = (name) => {
	const cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		const cookiePair = cookies[i].split("=");

		if (name == cookiePair[0].trim()) {
			return decodeURIComponent(cookiePair[1]);
		}
	}

	return null;
};

const setCookie = (name, value, days) => {
	const d = new Date();
	d.setTime(
		days < 0 ? -1 : d.getTime() + days * 24 * 60 * 60 * 1000
	);

	const expires = "expires=" + d.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

const allCookies = () => {
	const pairs = document.cookie.split(";");
	const cookies = {};

	for (var i = 0; i < pairs.length; i++) {
		const pair = pairs[i].split("=");
		cookies[(pair[0] + "").trim()] = decodeURIComponent(
			pair.slice(1).join("=")
		);
	}

	return cookies;
};

const removeError = (el) => {
	const fdnField = el.parentNode.parentNode;

	fdnField.classList.remove("has-error");
};

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
};

const setPaymentMethod = (el) => {
	const id = el.getAttribute("data-method-id");

	allMethods.forEach((m) =>
		m.classList.replace("primary", "secondary")
	);
	el.classList.replace("secondary", "primary");

	paymentState.set("payment_method", id);

	$$(".donate-payment-method-container").forEach(
		(c) => (c.hidden = true)
	);
	$(`#donate-pay-method-${id}`).hidden = false;
};

const inputState = new Map();
const paymentState = new Map();

paymentState.set(
	"currency",
	getCookie("currency")
		? getCookie("currency")
		: $("#currency_input").value
);

if (allAmountsInGrid.find((e) => e.classList.contains("primary"))) {
	const amountIndex = allAmountsInGrid.findIndex((e) =>
		e.classList.contains("primary")
	);

	setAmount(amountIndex);
}

new URL(window.location.href).searchParams.forEach((v, k) => {
	if (!paymentState.has(k)) {
		if (k == "amount") v = parseFloat(v);

		paymentState.set(k, v);
	}
});

const currencyIsCrypto =
	!!window.SCALAR_DONATION_CONFIG.crypto.currencies.find(
		(c) => c.id == paymentState.get("currency")
	);

const setError = (el, message) => {
	removeError(el);

	const fdnField = el.parentNode.parentNode;

	fdnField.classList.add("has-error");
	fdnField.getElementsByClassName(
		"fdn-input-error"
	)[0].textContent = message;
};

const formattedCurrency = (num) => {
	return num.toLocaleString(document.documentElement.lang, {
		minimumFractionDigits: 2,
		maximumFractionDigits: currencyIsCrypto ? 10 : 2
	});
};

const getPriceInCurrency = (amount, currency) => {
	const currencyExchangeRate = allCurrencies.find(
		(c) => c.id == currency
	).rate;

	return amount * currencyExchangeRate;
};

const resetAmount = () => {
	setAmount(window.SCALAR_DONATION_CONFIG.default_amount);
};

const subsAmountCurrSymbol = (amount, currencyId) => {
	const currency = allCurrencies.find(
		(c) =>
			c.id ==
			(currencyId ? currencyId : paymentState.get("currency"))
	);

	const ctx = {
		...currency,
		amount
	};

	const value = currency.format_amount.replace(
		/{[a-z0-9_\- ]+}/g,
		(m) => {
			const key = m.replace("{", "").replace("}", "").trim();

			return ctx[key];
		}
	);

	return value;
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
	setCookie("currency", paymentState.get("currency"), 30);
	window.location.hash = "#step-1";

	window.location.reload();
});

const updateCryptoExNote = () => {
	if (!window.SCALAR_DONATION_CONFIG.crypto.enabled) return;

	const currency =
		window.SCALAR_DONATION_CONFIG.crypto.currencies.find(
			(c) => c.id == paymentState.get("currency")
		);
	const value = $("#custom_amount_input").value.replace(/,/g, "");
	const currentAmount = parseFloat(value ? value : 1);

	$(
		"#donate-crypto-exchange-note"
	).textContent = `${subsAmountCurrSymbol(
		formattedCurrency(currentAmount, 10)
	)} ~ ${subsAmountCurrSymbol(
		formattedCurrency(
			parseFloat((currentAmount / currency.rate).toFixed(2))
		),
		window.SCALAR_DONATION_CONFIG.base_currency
	)}`;
};

if (currencyIsCrypto) {
	updateCryptoExNote();
}

$("#custom_amount_input").addEventListener("keyup", (e) => {
	if (
		window.SCALAR_DONATION_CONFIG.crypto.enabled &&
		window.SCALAR_DONATION_CONFIG.crypto.currencies.find(
			(c) => c.id == paymentState.get("currency")
		)
	) {
		const currentAmount = parseFloat(e.target.value);

		if (currentAmount == 0) return;

		updateCryptoExNote();
	}
});

$("#custom_amount_input").addEventListener("blur", (e) => {
	e.target.value = e.target.value.trim();

	if (!e.target.value.length) {
		if (
			!allAmountsInGrid.filter((a) =>
				a.classList.contains("primary")
			).length
		) {
			resetAmount();
		}

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
			`Sorry, we cannot process any donations over ${subsAmountCurrSymbol(
				formattedCurrency(hardLimit)
			)} at the moment.`
		);
	} else if (parsed < lowestAllowed) {
		return setError(
			e.target,
			`Sorry, to combat fraud the minimum amount for donations is ${subsAmountCurrSymbol(
				formattedCurrency(lowestAllowed)
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

	updateCryptoExNote();
	paymentState.set("amount", parsed);
	setAmount(-1);
});

$("#custom_amount_input").addEventListener("focus", (e) => {
	if (inputState.has(e.target) && !currencyIsCrypto) {
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

allMethods.forEach((btn) => {
	btn.addEventListener("click", (e) => setPaymentMethod(e.target));
});

$("#donate-payment-method-card-number").addEventListener(
	"input",
	(e) => {
		const trimmed = e.target.value
			.replace(/[^0-9 ]+/, "")
			.trim()
			.replace(/\s/g, "");

		if (e.target.value.length >= 19)
			return (e.target.value = e.target.value.substring(0, 19));

		e.target.value = trimmed;

		e.target.value = (e.target.value.match(/.{1,4}/g) || []).join(
			" "
		);
	}
);

$("#donate-step-2-next-btn").addEventListener("click", (e) => {
	if (paymentState.get("amount")) {
		$("#step-1").classList.add("fdn-disabled");
		$("#step-2").classList.add("fdn-disabled");
		$("#step-3").classList.remove("fdn-disabled");
	}
});

$("#donate-step-3-previous-btn").addEventListener("click", (e) => {
	$("#step-1").classList.remove("fdn-disabled");
	$("#step-2").classList.remove("fdn-disabled");
	$("#step-3").classList.add("fdn-disabled");
});
