import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

const NotFound = (props: MDXRemoteProps) => {
	return <MDXRemote {...props} />;
};

export default NotFound;
