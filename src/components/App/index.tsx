import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../pages/Home'
import Download from '../../pages/Download'
import NotFound from '../../pages/404'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/products/browser/download" component={Download} />
    <Route component={NotFound} />
  </Switch>
)

export default App
