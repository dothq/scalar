/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(() => {
    function setCookie(name, value, days) {
        let expires = "";

        if (days) {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + d.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    window.FlagManager = {
        /** @type {Record<string, number>} */
        get allFlags() {
            return globalThis._DOT_FEATURE_FLAGS;
        },

        get _rawFlags() {
            return parseInt(getCookie("web_flags"));
        },

        get flags() {
            const myFlags = {};

            for (const key of Object.keys(this.allFlags)) {
                myFlags[key] = this.isEnabled(key);
            }

            return myFlags;
        },

        isEnabled(id) {
            return Boolean(this._rawFlags & 1 << this.allFlags[id]);
        },

        setState(id, enabled) {
            if (id in this.allFlags) {
                let newFlags = this._rawFlags;

                if (enabled) {
                    newFlags |= 1 << this.allFlags[id];
                } else {
                    newFlags = newFlags & ~(1 << this.allFlags[id]);
                }

                setCookie("web_flags", newFlags, 7);
            } else {
                throw new Error(`No flag with ID '${id}'!`);
            }
        },

        enable(id) {
            return this.setState(id, true);
        },

        disable(id) {
            return this.setState(id, false);
        }
    }

    window.gFlags = FlagManager.flags;

    for (const key of Object.keys(window.gFlags)) {
        Object.defineProperty(window.gFlags, key, {
            get: () => {
                return FlagManager.flags[key];
            },

            set: (v) => {
                FlagManager.setState(key, v);
                window.location.reload();
            }
        });
    }
})();