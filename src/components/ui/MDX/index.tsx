import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { Typography } from "../Typography";

const t8y = (type: string) => {
	return {
		[type]: ({ children, ...props }: any) => (
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
			components={{
				...(props.components || {}),
				...t8y("h1"),
				...t8y("h2"),
				...t8y("h3"),
				...t8y("h4"),
				...t8y("p")
			}}
		/>
	);
};
