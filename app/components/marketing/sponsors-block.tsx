/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Block } from ".";
import { useTranslations } from "../../l10n";
import { getComponentConfig } from "../../utils/data";
import Button from "../ui/Button";
import { Hero, HeroBody } from "../ui/Hero";
import Stack from "../ui/Stack";

const BLOCK_ID = "sponsors-block";

interface SponsorItem {
	id: string;
	name: string;
	url: string;
	logo_url: string;
	description: string;
}

interface SponsorsConfig {
	items: SponsorItem[];
}

const SponsorsBlock = () => {
	const [l, Localised] = useTranslations(BLOCK_ID);

	const data = getComponentConfig<SponsorsConfig>("sponsors");

	if (!data.items.length) return <></>;

	return (
		<Block id={BLOCK_ID}>
			<Hero>
				<HeroBody>
					<Stack orientation={"v"} gap={"xl"}>
						<Stack orientation={"v"} gap={"sm"}>
							<h4>{l("title")}</h4>
							<p>{l("subtitle")}</p>
						</Stack>

						<Stack orientation={"h"} gap={"xl"}>
							{data.items.map((i) => (
								<Button
									href={i.url}
									target={"_blank"}
									className={"sponsor-item"}
								>
									<img
										src={i.logo_url}
										alt={i.name}
									></img>

									<Stack
										orientation={"v"}
										gap={"sm"}
									>
										<h5>{i.name}</h5>
										<p>{i.description}</p>
									</Stack>
								</Button>
							))}
						</Stack>
					</Stack>
				</HeroBody>
			</Hero>
		</Block>
	);
};

export default SponsorsBlock;
