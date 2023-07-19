/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FastifyReply, FastifyRequest } from "fastify";

export interface PageMetadata {
	title?: string;
	titleSuffix?: boolean;
	description?: string;
	js?: string[];
	css?: string[];

	ogImage?: {
		url: string;
		alt: string;
	};
}

interface PageProps<
	Params = Record<string, string | number | boolean | undefined>
> {
	params: Params;
	query: Params;
	meta: PageMetadata;
	formData: URLSearchParams;
	url: URL;
	schema: any;
	req: FastifyRequest;
	res: FastifyReply;
	lang: string;
	cache: FastifyRequest["cache"];
}

declare module "fastify" {
	export interface FastifyRequest {
		cache: Map<
			string,
			{
				data: any;
				ttl?: number;
			}
		>;
	}
}

declare var __scalar_js: any[];
