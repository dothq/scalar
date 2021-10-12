import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import parser from "csv-parse/lib/sync";
import ReactDOM from "react-dom/server";
import papa from "papaparse";
import { Eye } from "../../../../icons/Eye";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { data: { 
        files: { 
            "views.csv": { 
                content 
            } 
        } 
    } } = await axios.get(`https://api.github.com/gists/cb78edcee9529e141be35617abefc90c?t=${Date.now()}`)

    const csv = parser(content, {
        columns: true,
        skip_empty_lines: true
    });

    const recordIndex = csv.findIndex((r: any) => r.id == req.query.id);
    const record = csv[recordIndex];

    if(record) {
        const Widget = () => {
            let { views } = record;

            try {
                views = parseInt(views).toLocaleString();
            } catch(e) {}

            return (
                <div className={"flex gap-2 text-black items-center"}>
                    <Eye className={"fill-current"} />
                    <span>{views} views</span>
                </div>
            )
        }

        ++csv[recordIndex].views;

        const raw = papa.unparse(csv);

        const rendered = ReactDOM.renderToString(<Widget />);

        await axios.patch("https://api.github.com/gists/cb78edcee9529e141be35617abefc90c", {
            files: {
                "views.csv": {
                    content: raw
                }
            }
        }, {
            headers: {
                accept: "application/vnd.github.v3+json",
                authorization: `token ${process.env.GITHUB_TOKEN}`
            }
        });

        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        res.send(rendered);  
    } else {
        res.send("");
    }
}

export default handler;