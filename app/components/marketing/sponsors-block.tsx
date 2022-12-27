/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Block } from ".";
import { useTranslations } from "../../l10n";
import Button from "../ui/Button";
import { Hero, HeroBody } from "../ui/Hero";
import Stack from "../ui/Stack";

const BLOCK_ID = "sponsors-block";

const SponsorsBlock = () => {
	const [l, Localised] = useTranslations(BLOCK_ID);

	return (
		<Block id={BLOCK_ID}>
			<Hero>
				<HeroBody>
					<Stack orientation={"v"} gap={"xl"}>
						<Stack orientation={"v"} gap={"sm"}>
							<h3>Our sponsors</h3>
							<p>
								The following organisations have
								generously provided their support to
								us:
							</p>
						</Stack>

						<Stack orientation={"h"} gap={"xl"}>
							<Button
								href={"https://tutanota.com/"}
								target={"_blank"}
								className={"sponsor-item"}
							>
								<img
									src={
										"/media/images/tutanota_logo.svg"
									}
									alt={"Tutanota logo"}
								></img>

								<Stack orientation={"v"} gap={"sm"}>
									<h5>Tutanota</h5>
									<p>Providing email services</p>
								</Stack>
							</Button>
						</Stack>
					</Stack>
				</HeroBody>
			</Hero>
		</Block>
	);
};

export default SponsorsBlock;
