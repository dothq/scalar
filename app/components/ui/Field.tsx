/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import clsx from "clsx";
import { cloneElement } from "preact";
import { JSXInternal } from "preact/src/jsx";

type FDNFieldProps = {
	/**
	 * Label for the field
	 */
	label?: any;

	/**
	 * Prefix attachment
	 */
	prefix?: any;

	/**
	 * Suffix attachment
	 */
	suffix?: any;

	/**
	 * Unique identifier for the container of the field
	 */
	outerId?: string;

	/**
	 * Determines the size of the field
	 */
	size?: FDNSize;

	/**
	 * Unique identifier for the field's <input>
	 */
	id?: string;

	/**
	 * Attach an error message
	 */
	error?: string;

	/**
	 * Makes the field fit the full width of its container
	 */
	fullwidth?: boolean;
};

export type FieldProps = FDNFieldProps &
	Omit<
		JSXInternal.HTMLAttributes<HTMLInputElement>,
		keyof FDNFieldProps
	>;

const Field = ({
	label,
	prefix,
	suffix,
	outerId,
	id,
	size,
	error,
	children,
	fullwidth,
	...rest
}: FieldProps & { children: any }) => {
	size = size ? size : ("md" as any);

	const className = clsx("fdn-field", {
		"has-prefix": !!prefix,
		"has-suffix": !!suffix,
		"has-error": !!error,
		"full-width": !!fullwidth,
		[size as any]: true
	});

	const Input = cloneElement(children, {
		...rest,
		className: clsx("fdn-internal-input", rest.className || ""),
		id
	});

	return (
		<div id={outerId} className={className} data-type={rest.type}>
			{label && <label for={id}>{label}</label>}

			<div className={"fdn-input"}>
				{prefix && (
					<span className={"fdn-input-prefix"}>
						{prefix}
					</span>
				)}
				{Input}
				{suffix && (
					<span className={"fdn-input-suffix"}>
						{suffix}
					</span>
				)}
			</div>

			<span className={"fdn-input-error"}>{error}</span>
		</div>
	);
};

export default Field;
