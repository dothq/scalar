/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

type FDNColour =
	| "red"
	| "orange"
	| "yellow"
	| "green"
	| "blue"
	| "purple"
	| "pink"
	| "black"
	| "white";

type FDNSize = "sm" | "md" | "lg";
type FDNSizeExtended = FDNSize | "xl" | "fw" | "fh";

type FDNStateType = "info" | "warn" | "success" | "error";

type FDNOrientation = "h" | "v";

type FDNOverflow = "hidden" | "scroll" | "clip" | "visible";
