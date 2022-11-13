/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { l } from "../../../l10n";
import { localisedHref } from "../../Link";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import FooterSection from "./section";

const FooterLanguage = () => {
	let go = "/" + ((global as any).SCALAR_URL.split("/")[2] || "");

	return (
		<FooterSection title={l("footer-language-section")}>
			<form
				id={"app-language-switcher"}
				className={"fdn-footer-langage-switcher"}
				action={localisedHref("/select-language")}
				method={"GET"}
			>
				<Select
					name={"new_locale"}
					fullwidth
					items={(global as any).SCALAR_LANGUAGE_MAP}
				/>

				<input type={"hidden"} name={"go"} value={go}></input>

				<Button type={"primary"} colour={"black"} noJS>
					Update
				</Button>
			</form>
		</FooterSection>
	);
};

export default FooterLanguage;
