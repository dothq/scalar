import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import * as ReactDOM from 'react-dom'

const paddedUrl = window.location.pathname.padEnd(
  window.location.pathname.length + 1,
  '/'
)
const language = paddedUrl.split('/').filter((_) => _.length)[0]

ReactDOM.hydrate(
  <BrowserRouter>
    <App language={language} />
  </BrowserRouter>,
  document.getElementById('app')
)

if ('hot' in module) {
  ;(module as any).hot.accept()
}
