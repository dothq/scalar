/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Logo from "../../ui/Logo"
import Sitemap from "./sitemap"

const Footer = () => {
    return (
        <footer class="fdn-footer">
            <div class="fdn-footer-container">
                <div>
                    <Logo mark type={false}/>
                    <Sitemap />
                </div>
                <hr />
            </div>
        </footer>
    )
}


export default Footer