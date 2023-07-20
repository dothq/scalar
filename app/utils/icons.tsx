/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ArrowRight } from "../components/icons/ArrowRight";
import { ChevronDown } from "../components/icons/ChevronDown";
import { Close } from "../components/icons/Close";
import { Giving } from "../components/icons/Giving";
import { Institution } from "../components/icons/Institution";
import { JavaScript } from "../components/icons/JavaScript";
import { Menu } from "../components/icons/Menu";
import { News } from "../components/icons/News";
import { PaymentCard } from "../components/icons/PaymentCard";
import { ArrowRightAnimated } from "../components/icons/animated/ArrowRightAnimated";
import { Discord } from "../components/icons/brands/Discord";
import { Mastodon } from "../components/icons/brands/Mastodon";
import { Matrix } from "../components/icons/brands/Matrix";
import { Twitter } from "../components/icons/brands/Twitter";
import { Amex } from "../components/icons/cards/Amex";
import { Discover } from "../components/icons/cards/Discover";
import { Mastercard } from "../components/icons/cards/Mastercard";
import { Visa } from "../components/icons/cards/Visa";
import ProductLockup from "../components/ui/ProductLockup";

const Icons = {
	/* Brand icons */
	BrowserDesktop: (props: any) => (
		<ProductLockup {...props} product={"browser"} mark={true} />
	),
	Translate: (props: any) => (
		<ProductLockup {...props} product={"translate"} mark={true} />
	),
	One: (props: any) => (
		<ProductLockup {...props} product={"one"} mark={true} />
	),
	Shield: (props: any) => (
		<ProductLockup {...props} product={"shield"} mark={true} />
	),

	/* Foundation icons */
	ArrowRight: (props: any) => <ArrowRight {...props} />,
	ArrowRightAnimated: (props: any) => (
		<ArrowRightAnimated {...props} />
	),
	ChevronDown: (props: any) => <ChevronDown {...props} />,
	Close: (props: any) => <Close {...props} />,
	Giving: (props: any) => <Giving {...props} />,
	Institution: (props: any) => <Institution {...props} />,
	JavaScript: (props: any) => <JavaScript {...props} />,
	Menu: (props: any) => <Menu {...props} />,
	PaymentCard: (props: any) => <PaymentCard {...props} />,
	News: (props: any) => <News {...props} />,

	/* Card icons */
	Amex: (props: any) => <Amex {...props} />,
	Discover: (props: any) => <Discover {...props} />,
	Mastercard: (props: any) => <Mastercard {...props} />,
	Visa: (props: any) => <Visa {...props} />,

	/* Social icons */
	Twitter: (props: any) => <Twitter {...props} />,
	Mastodon: (props: any) => <Mastodon {...props} />,
	Discord: (props: any) => <Discord {...props} />,
	Matrix: (props: any) => <Matrix {...props} />
};

export default Icons;
