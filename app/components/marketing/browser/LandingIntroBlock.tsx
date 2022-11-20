/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Block } from "..";
import { useTranslations } from "../../../l10n";
import BrowserWireframe from "../../assets/BrowserWireframe";
import { ArrowRightAnimated } from "../../icons/animated/ArrowRightAnimated";
import Button from "../../ui/Button";
import ConstrainedChildren from "../../ui/ConstrainedChildren";
import { Hero, HeroBody } from "../../ui/Hero";
import Stack from "../../ui/Stack";

const BLOCK_ID = "browser-landing-intro-block";

const BrowserLandingIntroBlock = () => {
	const [l, Localised] = useTranslations(BLOCK_ID);

	return (
		<Block id={BLOCK_ID}>
			<Hero detatched colour={"white"} size={"xl"}>
				<HeroBody>
					<ConstrainedChildren>
						<Stack orientation={"h"} gap={"md"}>
							<Stack
								orientation={"v"}
								gap={"md"}
								flex={"1"}
							>
								<h1>
									<Localised id={"title"} />
								</h1>
							</Stack>

							<Stack
								orientation={"v"}
								gap={"lg"}
								xy={"end"}
							>
								<p className={"text-right"}>
									<Localised id={"description"} />
								</p>

								<Button colour={"blue"}>
									<Localised
										id={"cta-btn-text"}
										arrow-right={
											<ArrowRightAnimated
												colour={
													"current-color"
												}
											/>
										}
									/>
								</Button>
							</Stack>
						</Stack>
					</ConstrainedChildren>
				</HeroBody>

				<BrowserWireframe />
			</Hero>
		</Block>
	);
};

export default BrowserLandingIntroBlock;
