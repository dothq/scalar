import * as express from "express";
import { existsSync } from 'fs';
import { resolve } from 'path';
import { pugTransformer } from './transformers';

class Server {
  public restServer: any;

  constructor(port: number) {
    this.restServer = express();

    this.restServer.use((req, res, next) => {
      if (req.path.match(/(\/[a-z]{2}(-[A-Z]{2})?)/)) {
        next()
      } else {
        res.redirect(301, `/${req.headers["accept-language"] || req.headers["language"] || "en-GB"}${req.path}`)
      }
    })

    this.restServer.listen(port, () => {
      console.log(`Server listening at http://127.0.0.1:${port}`)
    })
  }

  public get(route: string, callback: (req, res) => any) {
    this.restServer.get(`/:lang${route || "/"}`, (req, res) => {
      const returnValue = callback(req, res);

      if (typeof (returnValue) == "object" && returnValue.name) {
        const viewLoc = resolve(process.cwd(), "frontend", "views", `${returnValue.name}.pug`);

        if (existsSync(viewLoc)) {
          res.end(pugTransformer(viewLoc, returnValue.data || {}, req.params.lang))
        } else {
          res.status(404).end("Not found.");
        }

      } else {
        res.send(returnValue);
      }
    })
  }
}

export default Server;
