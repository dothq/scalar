import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../pages/Home'
import Browser from '../../pages/products/browser'
import BrowserThanks from '../../pages/products/browser/thanks'
import NotFound from '../../pages/404'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products/browser" component={Browser} />
    <Route exact path="/products/browser/thanks" component={BrowserThanks} />
    <Route component={NotFound} />
  </Switch>
)

export default App
