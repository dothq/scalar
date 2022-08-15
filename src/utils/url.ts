
export const getCanonicalURL = (req: any) => {
	const host = req.headers.host as string;
	let protocol = /^localhost(:\d+)?$/.test(host)
		? "http:"
		: "https:";

	if (
		req.headers["x-forwarded-proto"] &&
		typeof req.headers["x-forwarded-proto"] === "string"
	) {
		protocol = `${req.headers["x-forwarded-proto"]}:`;
	}

	return `${protocol}//${req.headers.host}`;
};
