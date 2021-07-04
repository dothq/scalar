import Home from './pages/Home'

// About
import About from './pages/about'
import AboutPrivacy from './pages/about/privacy/index'
import AboutPrivacyWebsite from './pages/about/privacy/website'
import AboutPrivacyID from './pages/about/privacy/id'
import AboutTerms from './pages/about/terms'
import AboutCookies from './pages/about/cookies'
import AboutGDPR from './pages/about/gdpr'

// Products
import Browser from './pages/products/desktop'
import One from './pages/products/one'

// Help
import Help from './pages/help'
import HelpPage from './pages/help/page'

// 404 pages
import NotFound from './pages/404'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    title: 'Dot Browser ─ The browser with privacy at heart.',
  },

  { path: '/about', component: About, exact: true, title: 'About ─ Dot HQ' },
  {
    path: '/about/privacy',
    component: AboutPrivacy,
    exact: true,
    title: 'Privacy ─ Dot HQ',
  },
  {
    path: '/about/privacy/website',
    component: AboutPrivacyWebsite,
    exact: true,
  },
  { path: '/about/privacy/id', component: AboutPrivacyID, exact: true },
  {
    path: '/about/terms',
    component: AboutTerms,
    exact: true,
    title: 'Terms of Service ─ Dot HQ',
  },
  {
    path: '/about/cookies',
    component: AboutCookies,
    exact: true,
    title: 'Cookies ─ Dot HQ',
  },
  {
    path: '/about/gdpr',
    component: AboutGDPR,
    exact: true,
    title: 'GDPR ─ Dot HQ',
  },

  {
    path: '/products/desktop',
    component: Browser,
    exact: true,
    title: 'Dot Browser for Desktop ─ Dot HQ',
  },
  {
    path: '/products/one',
    component: One,
    exact: true,
    title: 'Dot One ─ Dot HQ',
  },
  // { path: '/products/browser/thanks', component: BrowserThanks, exact: true },
  // { path: '/products/compass', component: Compass, exact: true },

  // { path: '/help', component: Help, exact: true },
  // { path: '/help/:product/:key/:page', component: HelpPage },

  { component: NotFound, title: 'Four Oh Four ─ Dot HQ' },
]

export const jsonRoutes = JSON.stringify(this)
export default routes
