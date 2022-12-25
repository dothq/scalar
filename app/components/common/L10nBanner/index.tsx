/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getPercentTranslated, getTranslation } from "../../../l10n";
import Localised from "../../Localised";
import Banner from "../../ui/Banner";
import Button from "../../ui/Button";
import Stack from "../../ui/Stack";

const L10nBanner = () => {
	return (
		<>
			{getPercentTranslated() < 100 && (
				<Banner size={"fw"}>
					<Stack
						orientation={"h"}
						x={"between"}
						y={"center"}
						w={"full"}
						gap={"lg"}
						wrap
						className={"fdn-page-constrain"}
						as={"span"}
					>
						<Localised
							id={"language-not-localised"}
							percent={getPercentTranslated()}
							fallback-lang={getTranslation(
								(global as any)
									.SCALAR_LANG_DEFAULT_BUNDLE,
								"language-native-name"
							)}
							contribute-btn={
								<Button
									href={"/contribute"}
									colour={"blue"}
								/>
							}
						/>
					</Stack>
				</Banner>
			)}
		</>
	);
};

export default L10nBanner;
