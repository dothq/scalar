import React from 'react'
import { Route, Switch } from 'react-router-dom'

import routes from '../../routes'

const App = () => (
  <Switch>
    {routes.map((route: any) => (
      <Route key={Math.random()} path={route.path} exact={route.exact || false} render={() => <route.component />}></Route>
    ))}
  </Switch>
)

export default App
