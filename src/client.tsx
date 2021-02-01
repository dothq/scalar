import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);

if ("hot" in module) {
    (module as any).hot.accept();
}
