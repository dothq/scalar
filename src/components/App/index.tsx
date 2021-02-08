import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../../pages/Home'
import About from '../../pages/About'

// Products
import Browser from '../../pages/products/browser'
import BrowserThanks from '../../pages/products/browser/thanks'
import Compass from '../../pages/products/compass'

// DotID stuff
import Signup from '../../pages/id/Signup'
import Login from '../../pages/id/Login'

// 404 pages
import NotFound from '../../pages/404'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />

    {/* Products */}
    <Route exact path="/products/browser" component={Browser} />
    <Route exact path="/products/browser/thanks" component={BrowserThanks} />
    <Route exact path="/products/compass" component={Compass} />

    {/* DotID stuff */}
    <Route exact path="/id/signup" component={Signup} />
    <Route exact path="/id/login" component={Login} />

    {/* 404 page */}
    <Route component={NotFound} />
  </Switch>
)

export default App
