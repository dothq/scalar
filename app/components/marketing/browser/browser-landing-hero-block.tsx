/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Block } from "..";
import { useTranslations } from "../../../l10n";
import Link from "../../Link";
import { Download } from "../../icons/Download";
import Button from "../../ui/Button";
import ConstrainedChildren from "../../ui/ConstrainedChildren";
import { Hero, HeroBody } from "../../ui/Hero";
import ProductLockup from "../../ui/ProductLockup";
import Stack from "../../ui/Stack";

const BLOCK_ID = "browser-landing-hero-block";

const BrowserLandingHeroBlock = () => {
	const [l, Localised] = useTranslations(BLOCK_ID);

	return (
		<Block id={BLOCK_ID}>
			<Hero colour={"white"} size={"xl"}>
				<HeroBody>
					<ConstrainedChildren>
						<Stack
							gap={"lg"}
							orientation="v"
							x={"center"}
						>
							<ProductLockup
								product={"browser"}
								mark
								size={64}
							/>
							<h1 className={"browser-tagline"}>
								<Localised
									id="title"
									highlight={<span />}
								/>
							</h1>
							<h5>{l("subtitle")}</h5>
						</Stack>

						<Stack
							gap={"lg"}
							orientation="v"
							x={"center"}
						>
							<Button colour={"blue"}>
								{l("cta-btn-text")}
								<Download
									size={20 / 16}
									colour="current-color"
								/>
							</Button>

							<Link href="">
								All platforms and languages
							</Link>
						</Stack>
					</ConstrainedChildren>
				</HeroBody>
			</Hero>
		</Block>
	);
};

export default BrowserLandingHeroBlock;
