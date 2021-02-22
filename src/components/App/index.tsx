import React from 'react'
import { Route, Switch } from 'react-router-dom'

import routes from '../../routes'

const App = () => (
  <Switch>
    {routes.map(route => (
      <Route key={route.path} path={route.path} exact={route.exact || false} component={route.component}></Route>
    ))}
  </Switch>
)

export default App
