/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { negotiateLanguages } from "@fluent/langneg";
import clsx from "clsx";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { Amex } from "../../components/icons/cards/Amex";
import { Discover } from "../../components/icons/cards/Discover";
import { Mastercard } from "../../components/icons/cards/Mastercard";
import { Visa } from "../../components/icons/cards/Visa";
import { Giving } from "../../components/icons/Giving";
import { Institution } from "../../components/icons/Institution";
import { JavaScript } from "../../components/icons/JavaScript";
import { PaymentCard } from "../../components/icons/PaymentCard";
import Link from "../../components/Link";
import Aside from "../../components/ui/Aside";
import Banner from "../../components/ui/Banner";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import ClientData from "../../components/ui/ClientData";
import Radio from "../../components/ui/Radio";
import Select from "../../components/ui/Select";
import Separator from "../../components/ui/Separator";
import TextField from "../../components/ui/TextField";
import ogImages from "../../og";
import { PageProps } from "../../types";
import { getComponentConfig } from "../../utils/data";

export const meta = {
	title: "Donate",
	description:
		"Support us with your donations so we can continue to develop software focused around privacy.",
	js: ["donations/index.js", "env.js"],
	css: ["donate.css"],

	ogImage: ogImages.donate
};

const DonationFront = async ({ req, res }: PageProps) => {
	const data = getComponentConfig<any>("donations");

	const allCurrencies = (
		data.fiat.enabled ? data.fiat.currencies : []
	).concat(data.crypto.enabled ? data.crypto.currencies : []);

	const allCurrencyLocales = data.fiat.currencies
		.map((h: any) => h.local_currency_of)
		.reduce((a: any, b: any) => a.concat(b));

	let defaultCurrencyId = "unset";
	let defaultCurrency = allCurrencies.find(
		(c: any) => c.id == defaultCurrencyId
	);

	const getLocalCurrency = () => {
		return data.fiat.currencies.find((c: any) =>
			c.local_currency_of.includes(
				negotiateLanguages(
					parseAcceptLanguage(
						req.headers["accept-language"]
					),
					allCurrencyLocales,
					{
						defaultLocale: "unset",
						strategy: "matching"
					}
				)[0]
			)
		);
	};

	if (
		req.cookies.currency &&
		allCurrencies.find((c: any) => c.id == req.cookies.currency)
	) {
		defaultCurrencyId = req.cookies.currency;
		defaultCurrency = allCurrencies.find(
			(c: any) => c.id == defaultCurrencyId
		);
	} else {
		defaultCurrency = getLocalCurrency();

		defaultCurrencyId = defaultCurrency.id;
	}

	const defaultCurrencyIsCrypto = !!data.crypto.currencies.find(
		(c: any) => c.id == defaultCurrencyId
	);

	const getExchangedRate = (amount: number, rate: number) => {
		return Math.round((amount * rate) / 5) * 5;
	};

	const defaultCurrencyExchangeRate = defaultCurrency.rate;

	const defaultCurrencyCodeSide =
		defaultCurrency.format_amount.indexOf("{amount}") >=
		defaultCurrency.format_amount.indexOf("{symbol}")
			? "left"
			: "right";

	const subsAmountCurrSymbol = (
		amount: any,
		currencyId: string
	) => {
		const currency = allCurrencies.find(
			(c: any) => c.id == currencyId
		);

		if (!currency)
			throw new Error(`No currency found by ${currencyId}.`);

		const ctx = {
			...currency,
			amount
		};

		const value = currency.format_amount.replace(
			/{[a-z0-9_\- ]+}/g,
			(m: any) => {
				const key = m
					.replace("{", "")
					.replace("}", "")
					.trim();

				return ctx[key];
			}
		);

		return value;
	};

	const formattedCurrency = (num: number) => {
		return num.toLocaleString(
			parseAcceptLanguage(req.headers["accept-language"]),
			{
				maximumFractionDigits: 2,
				minimumFractionDigits: 2
			}
		);
	};

	return (
		<>
			<ClientData id={"SCALAR_DONATION_CONFIG"} data={data} />
			<section className={"fdn-stack donate-app"}>
				<div className={"donate-aside-container"}>
					<Aside
						className={"donate-aside"}
						header={
							<>
								<Giving colour={"red"} size={2.625} />
								<div
									className={
										"donate-aside-text-container"
									}
								>
									<h2>Donate</h2>
									<p>
										You can support our projects
										financially through donations.
										<br />
										<br />
										Please refer to our FAQ for
										any questions.
									</p>
								</div>
							</>
						}
					>
						<>
							<div
								className={
									"donate-aside-text-container"
								}
							>
								<h3>What is my donation used for?</h3>
								<p>
									Your donation will be used towards
									funding development on Dot
									Browser, Dot Translate and Dot
									One.
									<br />
									<br />
									Additionally, long-term volunteers
									may be paid for the time spent
									contributing to Dot HQ projects.
								</p>
							</div>

							<div
								className={
									"donate-aside-text-container"
								}
							>
								<h3>
									Will my donation stay anonymous?
								</h3>
								<p>
									We have no way of knowing who made
									a donation. The only identifying
									features of donations we receive
									are either the last four digits of
									your card or your wallet address
									if paying via cryptocurrency.
									<br />
									<br />
									Our payment processor is Stripe,
									Inc.
									<br />
									<Link
										target={"_blank"}
										href={
											"/about/privacy#data-processors"
										}
									>
										How does this affect my
										privacy?
									</Link>
									.
								</p>
							</div>

							<div
								className={
									"donate-aside-text-container"
								}
							>
								<h3>
									How long will my payment
									information be stored?
								</h3>
								<p>
									Your payment information will be
									stored for the duration of your
									donation. For one-time donations,
									your payment information will be
									stored for up to 14 days to allow
									for refunds to take place. For
									monthly donations, your payment
									information will be stored until
									cancelled.
								</p>
							</div>

							<div
								className={
									"donate-aside-text-container"
								}
							>
								<h3>Am I eligible for a refund?</h3>
								<p>
									Yes, after you have made your
									donation you should make note of
									the URL or refund token given to
									you. You are entitled to a refund
									up to 14 days, after that we
									cannot process your refund.
									Donations made through
									cryptocurrencies are not eligible
									for refunds.
								</p>
							</div>

							<div
								className={
									"donate-aside-text-container"
								}
							>
								<h3>Any more questions?</h3>
								<p>
									We are able to answer your burning
									questions on donations in any of
									our official communication
									channels.
								</p>
							</div>
						</>
					</Aside>
				</div>

				<div className={"donate-flow-container"}>
					<noscript>
						<Banner type={"warn"} icon={<JavaScript />}>
							We're sorry, the donation page needs
							JavaScript to be enabled in order to
							function at the moment.
						</Banner>
					</noscript>

					<Card
						id={"step-1"}
						header={
							<>
								<Giving colour="red" size={2.625} />
								<h4>Step 1 - Select your currency</h4>
							</>
						}
						footer={
							<div
								className={
									"fdn-stack h flex-1 x-end gap-md"
								}
							>
								<Button
									href={"#step-2"}
									type={"primary"}
									colour={"blue"}
								>
									Next
								</Button>
							</div>
						}
					>
						<div
							className={
								"donate-card-container fdn-stack v gap-md"
							}
						>
							<Select
								id="currency_input"
								name="currency"
								autocomplete="off"
								items={() => {
									let items: any = [
										{
											value: "unset",
											disabled: true,
											children:
												"Choose a currency"
										}
									];

									if (
										data.fiat.enabled &&
										data.fiat.currencies
									) {
										data.fiat.currencies.map(
											(c: any) => {
												items.push({
													value: c.id,
													children: `${
														c.name
													} (${c.id.toUpperCase()})`
												});
											}
										);
									}

									if (
										data.crypto.enabled &&
										data.crypto.currencies
									) {
										if (data.fiat.enabled) {
											items.push({
												disabled: true
											});
										}

										data.crypto.currencies.map(
											(c: any) => {
												items.push({
													value: c.id,
													children: `${c.name} (${c.symbol})`
												});
											}
										);
									}

									items = items.map((c: any) => ({
										...c,
										selected:
											defaultCurrencyId ==
											c.value
									}));

									return items;
								}}
							/>
						</div>
					</Card>

					<Card
						id={"step-2"}
						header={
							<>
								<Giving colour="red" size={2.625} />
								<h4>Step 2 - Select an amount</h4>
							</>
						}
						footer={
							<div
								className={
									"fdn-stack h flex-1 x-end gap-md"
								}
							>
								<Radio
									id={"frequency_one_time"}
									name={"frequency"}
									label={"One-time"}
									checked
								/>
								<Radio
									id={"frequency_monthly"}
									name={"frequency"}
									label={"Monthly"}
								/>

								<Button
									id={"donate-step-2-next-btn"}
									href={"#step-3"}
									type={"primary"}
									colour={"blue"}
								>
									Next
								</Button>
							</div>
						}
					>
						<div
							className={
								"donate-card-container fdn-stack v gap-md"
							}
						>
							<div
								className={clsx(
									"donate-amounts-grid",
									{
										large:
											defaultCurrencyExchangeRate >=
											3
									}
								)}
							>
								{data.amounts.map(
									(am: number, i: number) => {
										const exchangedAmount =
											getExchangedRate(
												am,
												defaultCurrencyExchangeRate
											);

										let queryAmount = parseFloat(
											(req.query as any).amount
										);

										return (
											<Button
												type={
													(
														queryAmount
															? exchangedAmount ==
															  queryAmount
															: i ==
															  data.default_amount
													)
														? "primary"
														: "secondary"
												}
												fullwidth
												colour={"red"}
												data-amount={
													exchangedAmount
												}
												data-original-amount={
													am
												}
												hidden={
													defaultCurrencyIsCrypto
												}
											>
												{subsAmountCurrSymbol(
													exchangedAmount,
													defaultCurrencyId
												)}
											</Button>
										);
									}
								)}

								<TextField
									outerId={"custom_amount"}
									id={"custom_amount_input"}
									prefix={
										defaultCurrencyCodeSide ==
											"left" &&
										defaultCurrency.symbol
									}
									suffix={
										defaultCurrencyCodeSide ==
											"right" &&
										defaultCurrency.symbol
									}
									autocomplete="off"
									error={
										(req.query as any).amount
											? (req.query as any)
													.amount <
											  getExchangedRate(
													data.amounts[0],
													defaultCurrencyExchangeRate
											  )
												? `Sorry, to combat fraud the minimum amount for donations is ${formattedCurrency(
														getExchangedRate(
															data
																.amounts[0],
															defaultCurrencyExchangeRate
														)
												  )}.`
												: ""
											: ""
									}
									value={
										data.amounts
											.map((am: number) => {
												return getExchangedRate(
													am,
													defaultCurrencyExchangeRate
												);
											})
											.find(
												(am: number) =>
													am ==
													parseFloat(
														(
															req.query as any
														).amount
													)
											)
											? ""
											: parseFloat(
													(req.query as any)
														.amount
											  )
									}
								/>
							</div>
							{defaultCurrencyIsCrypto && (
								<>
									<p
										id={
											"donate-crypto-exchange-note"
										}
									>
										{subsAmountCurrSymbol(
											1,
											defaultCurrencyId
										)}{" "}
										~{" "}
										{subsAmountCurrSymbol(
											formattedCurrency(
												1 /
													defaultCurrency.rate
											),
											data.base_currency
										)}
									</p>

									<p>
										<strong>Note:</strong>{" "}
										Donations made using
										cryptocurrencies will incur a
										15% carbon tax to cover
										emissions.{" "}
										<Link
											href={
												"/about/environment#cryptocurrencies"
											}
											target={"_blank"}
										>
											Why?
										</Link>
									</p>
								</>
							)}
						</div>
					</Card>

					<Card
						id={"step-3"}
						className={"fdn-disabled"}
						header={
							<>
								<Giving colour="red" size={2.625} />
								<h4>Step 3 - Payment details</h4>
							</>
						}
						footer={
							<div
								className={
									"fdn-stack h flex-1 x-end gap-md"
								}
							>
								<Button
									id={"donate-step-3-previous-btn"}
									href={"#step-2"}
									type={"secondary"}
								>
									Previous
								</Button>

								<Button
									href={"#step-4"}
									type={"primary"}
									colour={"blue"}
								>
									Next
								</Button>
							</div>
						}
					>
						<div
							className={
								"donate-card-container fdn-stack v gap-md"
							}
						>
							{!defaultCurrencyIsCrypto && (
								<div
									id={"donate-pay-methods"}
									className={"fdn-stack h gap-md"}
								>
									<Button
										type={"secondary"}
										colour={"blue"}
										data-method-id={"card"}
									>
										<PaymentCard
											colour={"current-color"}
										/>
										Card
									</Button>

									<Button
										type={"secondary"}
										colour={"blue"}
										data-method-id={
											"bank_transfer"
										}
									>
										<Institution
											colour={"current-color"}
										/>
										Bank transfer
									</Button>
								</div>
							)}

							<Separator orientation={"h"} />

							<div
								className={
									"donate-payment-methods-container fdn-stack h gap-md"
								}
							>
								<div
									className={
										"donate-payment-method-container"
									}
									id={"donate-pay-method-card"}
									hidden
								>
									<h4>Card</h4>

									<p>
										Your card details will only be
										sent to Stripe, Inc (our
										payment processor).
									</p>

									<form className={"fdn-form"}>
										<TextField
											id={
												"donate-payment-method-card-number"
											}
											label={"Card Number"}
											autoComplete={"off"}
											suffix={
												<div
													className={
														"fdn-stack h gap-sm"
													}
												>
													<Visa size={2} />
													<Mastercard
														size={2}
													/>
													<Amex size={2} />
													<Discover
														size={2}
													/>
												</div>
											}
										/>

										<div
											className={
												"fdn-stack h gap-md x-between"
											}
										>
											<TextField
												id={
													"donate-payment-method-card-expiry"
												}
												label={"Expiry Date"}
												autoComplete={"off"}
											/>
											<TextField
												id={
													"donate-payment-method-card-cvc"
												}
												label={"CVC"}
												autoComplete={"off"}
												type={"password"}
											/>
										</div>
									</form>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</section>
		</>
	);
};

export default DonationFront;
