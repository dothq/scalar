import { FastifyRequest } from "fastify";
import { flags } from "../flags";

export const isFlagActive = (
	req: FastifyRequest,
	flag: keyof typeof flags
) => {
	const flagCookie = req.cookies["web_flags"];

	if (!flagCookie) return false;

	try {
		const bits = parseInt(flagCookie);

		const val = flags[flag];
		if (!val) return false;

		return Boolean(bits & val);
	} catch (e) {
		console.error(e);
		return false;
	}
};
