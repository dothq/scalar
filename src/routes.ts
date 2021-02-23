import Home from './pages/Home'

// About
import About from './pages/about'
import AboutPrivacy from './pages/about/privacy'

// Products
import Browser from './pages/products/browser'
import BrowserThanks from './pages/products/browser/thanks'
import Compass from './pages/products/compass'

// Help
import Help from './pages/help'
import HelpPage from './pages/help/page'

// DotID stuff
import Signup from './pages/id/Signup'
import Login from './pages/id/Login'

// 404 pages
import NotFound from './pages/404'

const routes = [
    { path: "/", component: Home, exact: true },

    { path: "/about", component: About, exact: true },
    { path: "/about/privacy", component: AboutPrivacy, exact: true },

    { path: "/products/browser", component: Browser, exact: true },
    { path: "/products/browser/thanks", component: BrowserThanks, exact: true },
    { path: "/products/compass", component: Compass, exact: true },
  
    { path: "/id/signup", component: Signup, exact: true },
    { path: "/id/login", component: Login, exact: true },
  
    { path: "/help", component: Help, exact: true },
    { path: "/help/:product/:key/:page", component: HelpPage },
  
    { component: NotFound },
]

export const jsonRoutes = JSON.stringify(this);
export default routes;