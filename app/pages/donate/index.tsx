/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { negotiateLanguages } from "@fluent/langneg";
import { parseAcceptLanguage } from "intl-parse-accept-language";
import { Giving } from "../../components/icons/Giving";
import Aside from "../../components/ui/Aside";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import TextField from "../../components/ui/TextField";
import { PageProps } from "../../types";
import { getComponentConfig } from "../../utils/data";

export const meta = {
	title: "Donate",
	description:
		"Support us with your donations so we can continue to develop software focused around privacy.",
	js: ["donations/index.js", "env.js"],
	css: ["donate.css"]
};

const DonationFront = ({ req }: PageProps) => {
	const data = getComponentConfig<any>("donations");

	const allCurrencyLocales = data.fiat.currencies
		.map((h: any) => h.local_currency_of)
		.reduce((a: any, b: any) => a.concat(b));

	let defaultCurrency = "unset";

	if (
		(req.query as any).currency &&
		data.fiat.currencies.find(
			(c: any) => c.id == (req.query as any).currency
		)
	) {
		defaultCurrency = (req.query as any).currency;
	} else {
		defaultCurrency = data.fiat.currencies.find((c: any) =>
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
		).id;
	}

	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: `window.SCALAR_DONATION_CONFIG = JSON.parse(\"${JSON.stringify(
						data
					).replace(/"/g, '\\"')}\");`
				}}
			></script>
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
									<a
										target={"_blank"}
										href={
											"/about/privacy#data-processors"
										}
									>
										How does this affect my
										privacy?
									</a>
									.
								</p>
							</div>
						</>
					</Aside>
				</div>

				<div className={"donate-flow-container"}>
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

									items.push({
										disabled: true
									});

									if (
										data.crypto.enabled &&
										data.crypto.currencies
									) {
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
											defaultCurrency == c.value
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
								<Button
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
							<div className={"donate-amounts-grid"}>
								<Button
									type={"secondary"}
									fullwidth
									colour={"red"}
								>
									£5
								</Button>

								<Button
									type={"secondary"}
									fullwidth
									colour={"red"}
								>
									£10
								</Button>

								<Button
									type={"primary"}
									fullwidth
									colour={"red"}
								>
									£25
								</Button>

								<Button
									type={"secondary"}
									fullwidth
									colour={"red"}
								>
									£50
								</Button>

								<Button
									type={"secondary"}
									fullwidth
									colour={"red"}
								>
									£100
								</Button>

								<Button
									type={"secondary"}
									fullwidth
									colour={"red"}
								>
									£200
								</Button>

								<TextField
									outerId={"custom_amount"}
									id={"custom_amount_input"}
									type={"tel"}
									prefix={"£"}
								/>
							</div>
						</div>
					</Card>

					<Card
						id={"step-3"}
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
								"donate-card-container fdn-stack h gap-md"
							}
						>
							<Button type={"primary"} colour={"blue"}>
								Card
							</Button>

							<Button
								type={"secondary"}
								colour={"blue"}
							>
								Bank transfer
							</Button>

							<Button
								type={"secondary"}
								colour={"blue"}
							>
								Cryptocurrency
							</Button>
						</div>
					</Card>
				</div>
			</section>
		</>
	);
};

export default DonationFront;
