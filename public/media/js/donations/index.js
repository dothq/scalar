/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const formPost = (path, params) => {
	const form = document.createElement("form");
	form.method = "POST";
	form.action = path;

	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			const hiddenField = document.createElement("input");
			hiddenField.type = "hidden";
			hiddenField.name = key;
			hiddenField.value = params[key];

			form.appendChild(hiddenField);
		}
	}

	const el = document.body.appendChild(form);
	form.submit();
	el.outerHTML = "";
};

const eventHandlers = {
	"#donation_front_card_number": {
		focus: (e) => {
			// We add spaces to the value using JS
			// so the maxLength needs to be updated
			// to account for that.
			if (e.target.maxLength == 16) {
				e.target.maxLength = 19;
			}
		},
		input: (e) => {
			const cleanValue = e.target.value.replace(/\s/g, "");

			if (e.keyCode == 8 /* backspace */) {
				return;
			}

			if (cleanValue.length == 16) return;

			const match =
				(cleanValue || "").toString().match(/[0-9]{1,4}/g) ||
				[];

			e.target.value = match.join(" ");
		}
	},
	"#donation_front_expiry_date": {
		input: (e) => {
			const cleanValue = e.target.value.replace(/\s/g, "");

			const month = cleanValue.split("/")[0];
			const year = cleanValue.split("/")[1];

			if (cleanValue.length == 2) {
				e.target.value = e.target.value + "/";
			} else if (
				cleanValue.length == 3 &&
				e.inputType !== "insertText"
			) {
				e.target.value = e.target.value.replace("/", "");
			}

			e.target.value = (
				cleanValue.match(
					/^(0[1-9]|1[0-2])\/?([0-9]{2})$/
				)[0] || cleanValue
			).replace(/[^0-9\/]/g, "");
		}
	},
	"#payment-form": {
		submit: (e) => {
			e.preventDefault();
			e.stopPropagation();

			fetch("https://api.stripe.com/v1/payment_methods", {
				method: "POST",
				headers: {
					"content-type":
						"application/x-www-form-urlencoded",
					authorization: `Bearer ${window.SCALAR_ENV.STRIPE_CLIENT_API_KEY}`
				},
				body: new URLSearchParams({
					type: "card",
					"card[number]": parseInt(
						e.target.elements._card_number.value.replace(
							/\s/g,
							""
						)
					),
					"card[exp_month]": parseInt(
						e.target.elements._card_exp.value.split(
							"/"
						)[0]
					),
					"card[exp_year]": parseInt(
						e.target.elements._card_exp.value.split(
							"/"
						)[1]
					),
					"card[cvc]": parseInt(
						e.target.elements._card_cvc.value
					)
				}).toString()
			})
				.then((r) => r.json())
				.then((r) => {
					formPost("/api/v1/donations/intent", {
						payment_method: r.id,
						currency: e.target.elements.currency.value,
						amount: e.target.elements.amount.value
					});
				});
		}
	}
};

window.addEventListener("DOMContentLoaded", () => {
	// Shortcut to add all the event handlers for each el
	for (const [selector, handlers] of Object.entries(
		eventHandlers
	)) {
		Array.from(document.querySelectorAll(selector)).forEach(
			(el) => {
				for (const [key, handler] of Object.entries(
					handlers
				)) {
					el.addEventListener(key, handler);
				}
			}
		);
	}
});
