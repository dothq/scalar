/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { useID } from "@dothq/id";
import * as DF from ".";

export const meta = DF.meta;

const DonationFront__Success = () => {
	return (
		<>
			<h2>Thank you!</h2>

			<p>
				Your donation is greatly appreciated and will be used
				to fund important development and continue to provide
				service to you.
			</p>

			<h4>Payment details</h4>

			<ul>
				<li>
					<strong>Transaction ID</strong>{" "}
					<pre>{useID(2)}</pre>
				</li>

				<li>
					<strong>Payment Method ID</strong>{" "}
					<pre>{useID(2)}</pre>
				</li>
			</ul>

			<h4>Refunds</h4>

			<p>
				You have up to 14 days to receive a refund for this
				donation. We suggest you bookmark this page or write
				the whole URL down in order to process your refund. We
				will be unable to process your refund via email or
				other communication channels. After 14 days, you will
				no longer be able to request a refund using the button
				below.
			</p>

			<a class="fdn-button red">Refund transaction</a>
		</>
	);
};

export default DonationFront__Success;
