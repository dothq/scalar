import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

const ChromeExecutablePath: any = { 
    win32: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    linux: "/usr/bin/google-chrome",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
}

export const getTwitterAvatar = async (username: string, size?: string): Promise<string> => {
    const options = process.env.AWS_REGION
        ? {
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless
        }
        : {
            args: [],
            executablePath: ChromeExecutablePath[process.platform]
        };
    
    return new Promise(async (resolve) => {
        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        await page.goto(`https://mobile.twitter.com/${username}`);
        await page.waitForSelector(`img[src^="https://pbs.twimg.com/profile_images/"]`);
        const img = await page.$(`img[src^="https://pbs.twimg.com/profile_images/"]`);
        const src = await img?.getProperty("src")

        const url = src?._remoteObject.value.replace(
            "_200x200",
            `_${size || "normal"}`
        );

        browser.close();

        resolve(`${url}`);
    });
}