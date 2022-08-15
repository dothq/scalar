const Link = ({
	children,
	...props
}: JSX.IntrinsicElements["a"] & { children?: any }) => {
	return <a {...props}>{children}</a>;
};

export default Link;
