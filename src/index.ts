import express from 'express';
import Server from './server';

let app = Server;

if ("hot" in module) {
    (module as any).hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `./server`...');

        try {
            app = require('./server').default;
        } catch (error) {
            console.error(error);
        }

    });

    console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
    .use((req, res) => (app as any).handle(req, res))
    .listen(port, () => {
        console.log(`🚀  Started at http://localhost:${port}`);
    });