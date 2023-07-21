/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Button, { ButtonProps } from "../Button";

export interface Tab {
	value: string;
	label: string;
	disabled?: boolean;
	children?: any;
}

export const Tabs = ({
	tabs,
	id,
	selected,
	...rest
}: ButtonProps & {
	id: string;
	selected: string;
	tabs: () => Tab[] | Tab[];
}) => {
	const evaluatedTabs = typeof tabs == "function" ? tabs() : tabs;

	return (
		<div className={"/* fdn-tabs */"} role="tablist">
			{evaluatedTabs.map((tab, i) => (
				<>
					<input
						id={`tab__${tab.value}`}
						type="radio"
						name={`tabs__${id}`}
						checked={selected == tab.value}
						value={tab.value}
					></input>
					<Button
						className={"fdn-tab"}
						colour={rest.colour}
						fullwidth
						htmlFor={`tab__${tab.value}`}
						disabled={tab.disabled || false}
						as={"label"}
						style={{
							"--no-js-pos": "absolute",
							"--no-js-width": `${
								100 / evaluatedTabs.length
							}%`,
							"--no-js-left": `${
								(100 / evaluatedTabs.length) * i
							}%`
						}}
					>
						{tab.label}
					</Button>
					<div hidden style={{ paddingTop: "45px" }}>
						{typeof tab.children == "function"
							? tab.children()
							: tab.children}
					</div>
				</>
			))}
		</div>
	);
};
