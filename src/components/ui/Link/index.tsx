import NextLink, { LinkProps as NextLinkProps } from "next/link";

const Link = ({
	href,
	children,
	...props
}: JSX.IntrinsicElements["a"] &
	NextLinkProps & { children?: any }) => {
	return (
		<NextLink href={href}>
			<a {...props}>{children}</a>
		</NextLink>
	);
};

export default Link;
