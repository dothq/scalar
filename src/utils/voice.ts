import axios from "axios";
import { config } from "dotenv";

config();

export const generateVoiceBite = async (text: string) => {
    const base = new URL(`https://www.google.com/speech-api/v2/synthesize`);

    base.searchParams.set("enc", "mpeg");
    base.searchParams.set("client", "chromium");
    base.searchParams.set("key", `${process.env.VOICE_API_KEY}`);
    base.searchParams.set("lang", "en-GB");
    base.searchParams.set("text", text.toString());
    base.searchParams.set("speed", 0.4.toString());
    base.searchParams.set("pitch", 0.5.toString());

    const r = await axios.get(base.href, { responseType: "arraybuffer" })

    return r.data;
}