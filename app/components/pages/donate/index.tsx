/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Link from "../../Link";
import { Giving } from "../../icons/Giving";
import { JavaScript } from "../../icons/JavaScript";
import { Note } from "../../icons/Note";
import Aside from "../../ui/Aside";
import Banner from "../../ui/Banner";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Select from "../../ui/Select";
import { Tabs } from "../../ui/Tabs";

export const DonationsHome = () => {
	return (
		<>
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
										Everything that we do at Dot
										HQ is supported solely by the
										generous support and donations
										from people like you.
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
							JavaScript enabled to work properly.
						</Banner>
					</noscript>

					<Card
						header={
							<>
								<Note colour="red" size={2.625} />
								<h4>Select an amount</h4>
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
								"donate-card-container fdn-stack v gap-lg"
							}
						>
							<Select
								id="currency_input"
								name="currency"
								autocomplete="off"
								label={"Currency"}
								items={() => {
									let items: any = [
										{
											value: "unset",
											disabled: true,
											children:
												"Choose a currency"
										},
										{
											value: "",
											disabled: true,
											children: ""
										},
										{
											value: "eur",
											children: "EUR - Euro (€)"
										},
										{
											value: "gbp",
											children:
												"GBP - Great British Pounds (£)"
										},
										{
											value: "usd",
											children:
												"USD - United States Dollar ($)"
										}
									];

									return items;
								}}
							/>

							<Tabs
								id={"donation_frequency"}
								selected={"one_time"}
								colour={"red"}
								tabs={() => {
									return [
										{
											value: "one_time",
											label: "One-time"
										},
										{
											value: "recurring",
											label: "Recurring"
										}
									];
								}}
							/>
						</div>
					</Card>
				</div>
			</section>
		</>
	);
};
