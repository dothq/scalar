import { 
    BUILD_REMOTE_URI, 
    BUILD_REVISION, 
    BUILD_BRANCH 
} from "../env";

import { parseUA } from "../../utils/ua-parser";

export class LoadEvent {
    public constructor() {
        this.setDocumentState();
        this.logEnvironment();
    }

    public setDocumentState() {
        const { userAgent } = navigator;

        const parsed = parseUA(userAgent);

        document.documentElement.classList.remove("no-js");
        document.documentElement.classList.add("js");
        document.documentElement.classList.add(parsed.browser);
        document.documentElement.classList.add(`platform-${parsed.os}`);
        parsed.mobile && document.documentElement.classList.add("mobile");
        document.documentElement.classList.add(BUILD_BRANCH);
        document.documentElement.classList.add(
            document.documentElement.getAttribute("lang") || navigator.language
        );
    }

    public logEnvironment() {
        const parsedRepo = new URL(BUILD_REMOTE_URI);
        const repoDouble = parsedRepo.pathname.substr(1);

        const repoUrl = `https://${parsedRepo.host}/${repoDouble}`;
        const commitUrl = `${repoUrl}/commit/${BUILD_REVISION.substr(0, 7)}`

        console.info(`${repoDouble}#${BUILD_REVISION.substr(0, 7)}`)
        console.info(`audience: ${BUILD_BRANCH}`)
        console.info(`url: ${commitUrl}`)
    }
}