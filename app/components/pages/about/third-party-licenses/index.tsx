/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import axios from "axios";

export const RepositoryLicenseView = async ({
	repository
}: {
	repository: string;
}) => {
	const licensesRawUri = `https://raw.githubusercontent.com/dothq/third-party-licences/main/data/${repository}.json`;

	const licencesFetch = await axios.get(licensesRawUri);

	const licences = JSON.parse(licencesFetch.data);

	console.log(licences);
	return (
		<>
			<h4>{repository}</h4>
		</>
	);
};
