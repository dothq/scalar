export const parseUA = (userAgent: string) => {
    const data: {
        browser: string,
        os: string,
        mobile: boolean
    } = {
        browser: "unknown",
        os: "unknown",
        mobile: false
    };

    if(userAgent.includes("Chrome/")) data.browser = "chrome";
    else if(userAgent.includes("Firefox/")) data.browser = "firefox";
    else if(userAgent.includes("Edge/") || userAgent.includes("Edg/")) {
        data.browser = "edge";
    } else if(
        userAgent.includes("Macintosh") && 
        userAgent.includes("Safari/") &&
        userAgent.includes("AppleWebKit/") &&
        !userAgent.includes("Chrome/")
    ) {
        data.browser = "safari";
        data.os = "macos";
    }

    data.mobile = userAgent.includes("Android") || 
        userAgent.includes("iPhone") || 
        userAgent.includes("Mobile");

    if(
        userAgent.toLowerCase().includes("linux") ||
        userAgent.toLowerCase().includes("x11") ||
        userAgent.toLowerCase().includes("unix")
    ) data.os = "linux";
    if(userAgent.toLowerCase().includes("windows nt")) data.os = "windows";
    if(userAgent.toLowerCase().includes("bsd")) data.os = "bsd";

    if(userAgent.toLowerCase().includes("android")) data.os = "android";
    if(userAgent.toLowerCase().includes("iphone")) data.os = "ios";

    return data;
}