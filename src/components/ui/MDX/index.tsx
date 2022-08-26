import { Typography } from "@components/common/Typography";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import componentRegistry from "../..";

const t8y = <T extends string>(type: T) => {
	// eslint-disable-next-line react/display-name
	return {
		[type.toUpperCase()]: ({ children, ...props }: any) => (
			<Typography {...props} as={type}>
				{children}
			</Typography>
		)
	};
};

export type MDXRendererProps = MDXRemoteProps;
export const MDXRenderer = (props: MDXRemoteProps) => {
	return (
		<MDXRemote
			{...props}
			components={
				{
					...(props.components || {}),
					...componentRegistry,
					...t8y("h1"),
					...t8y("h2"),
					...t8y("h3"),
					...t8y("h4")
				} as any
			}
		/>
	);
};
