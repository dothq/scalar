import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getTwitterAvatar } from "../../../../utils/twitter"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "GET") {
        const url = await getTwitterAvatar(
            req.query.username.toString() || "twitter"
        );

        const r = await axios.get(url, { responseType: "arraybuffer" });
        
        res.setHeader("content-type", "image/jpeg");
        res.send(r.data);
    } else {
        res.status(404);
    }
}

export default handler;