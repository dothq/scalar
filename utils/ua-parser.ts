export const parseUA = (userAgent: string) => {
    const data: any = {};

    if(userAgent.includes("Chrome/")) data.browser = "chrome";
    else if(userAgent.includes("Firefox/")) data.browser = "firefox";
    else if(userAgent.includes("Edge/") || userAgent.includes("Edg/")) {
        data.browser = "edge";
    } else if(
        userAgent.includes("Macintosh") && 
        userAgent.includes("Safari/") &&
        userAgent.includes("AppleWebKit/") &&
        !userAgent.includes("Chrome/")) {
        data.browser = "safari";
    } else {
        data.browser = "unknown";
    }

    data.mobile = userAgent.includes("Android") || 
        userAgent.includes("iPhone") || 
        userAgent.includes("Mobile");

    return data;
}