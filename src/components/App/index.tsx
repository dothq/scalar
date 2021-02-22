import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/about'

// Products
import Browser from '../../pages/products/browser'
import BrowserThanks from '../../pages/products/browser/thanks'
import Compass from '../../pages/products/compass'

// Help
import Help from '../../pages/help'
import HelpPage from '../../pages/help/page'

// DotID stuff
import Signup from '../../pages/id/Signup'
import Login from '../../pages/id/Login'

// 404 pages
import NotFound from '../../pages/404'

const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/about", component: About, exact: true },

  { path: "/products/browser", component: Browser, exact: true },
  { path: "/products/browser/thanks", component: BrowserThanks, exact: true },
  { path: "/products/compass", component: Compass, exact: true },

  { path: "/id/signup", component: Signup, exact: true },
  { path: "/id/login", component: Login, exact: true },

  { path: "/help", component: Help, exact: true },
  { path: "/help/:product/:key/:page", component: HelpPage },

  { component: NotFound },
]

const App = () => (
  <Switch>
    {routes.map(route => (
      <Route key={route.path} path={route.path} exact={route.exact || false} component={route.component}></Route>
    ))}
  </Switch>
)

export default App
