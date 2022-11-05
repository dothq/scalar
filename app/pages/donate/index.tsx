/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Giving } from "../../components/icons/Giving";
import Aside from "../../components/ui/Aside";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import TextField from "../../components/ui/TextField";

export const meta = {
	title: "Donate",
	description:
		"Support us with your donations so we can continue to develop software focused around privacy.",
	js: ["donations/index.js", "env.js"],
	css: ["donate.css"]
};

const DonationFront = () => {
	return (
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
									Please refer to our FAQ for any
									questions.
								</p>
							</div>
						</>
					}
				></Aside>
			</div>

			<div className={"donate-flow-container"}>
				<Card
					header={
						<>
							<Giving colour="red" size={2.625} />
							<h4>Step 1 - Select an amount</h4>
						</>
					}
					footer={
						<div className={"fdn-stack h flex-1 x-end"}>
							<Button type={"primary"} colour={"blue"}>
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
								type={"num"}
								prefix={"£"}
							/>
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
};

export default DonationFront;
