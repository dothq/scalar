/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { JSXInternal } from "preact/src/jsx";
import { ChevronDown } from "../../icons/ChevronDown";
import Field, { FieldProps } from "../Field";

const Select = ({
	items,
	...rest
}: FieldProps & {
	items:
		| JSXInternal.HTMLAttributes<HTMLOptionElement>[]
		| (() => JSXInternal.HTMLAttributes<HTMLOptionElement>[]);
}) => {
	items = typeof items == "function" ? items() : items;

	return (
		<Field suffix={<ChevronDown />} {...rest}>
			<select>
				{items.map((i) => (
					<option {...i}>{i.children}</option>
				))}
			</select>
		</Field>
	);
};

export default Select;
