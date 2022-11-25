# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

-language-full-name = English (United Kingdom)
-language-short-name = English (UK)
-language-short-code = UK

language-select-format = { $percent ->
        [100] { $name }
       *[other] { $name } - { $percent }%
    }

language-not-localised = 
    This language is only { $percent }% translated.
    Some parts of the page will appear in { $fallback-lang }. 
    
    <contribute-btn>Contribute to { -language-short-name }</contribute-btn>

page-title-format = { $title } ― { -brand-full-name } ({ -language-short-code })