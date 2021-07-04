import axios from 'axios'
import React from 'react'

import ReactTooltip from 'react-tooltip'

import Markdown from 'markdown-to-jsx'

import { Button } from '../Button'
import { menus } from '../../menus'
import assets from '../../assets'
import { L10n } from '../l10n'
import { HeaderMenuItem } from '../HeaderMenuItem'

const ProductsMenu = () => (
  <>
    <HeaderMenuItem
      icon={'dot'}
      name={'Dot Browser for Desktop'}
      desc={'The privacy-based web browser for Windows, macOS and Linux.'}
      href={'/products/desktop'}
      links={[
        { name: "What's New", href: '/products/desktop/whats-new' },
        { name: 'Features', href: '/products/desktop/features' },
        { name: 'Download', href: '/products/desktop/download' },
        { name: 'Comparison', href: '/products/desktop/comparison' },
      ]}
    />

    <HeaderMenuItem
      icon={'dot-one'}
      name={'Dot One'}
      desc={'Sync your browsing data securely between all your devices.'}
      href={'/products/one'}
      links={[
        { name: "What's New", href: '/products/one/whats-new' },
        { name: 'Features', href: '/products/one/features' },
        { name: 'Sign Up', href: 'https://one.dothq.co/accounts/sign-up' },
        { name: 'Sign In', href: 'https://one.dothq.co/accounts/sign-in' },
      ]}
    />

    <HeaderMenuItem
      icon={'dot-mobile'}
      name={'Dot Browser for Mobile'}
      desc={'Your favourite privacy browser on Android.'}
      href={'/products/android'}
      links={[
        { name: "What's New", href: '/products/android/whats-new' },
        { name: 'Features', href: '/products/android/features' },
        { name: 'Download', href: '/products/android/download' },
        { name: 'Comparison', href: '/products/android/comparison' },
      ]}
    />
  </>
)

const BlogMenu = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <a
      href={'/branding'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Branding
    </a>
    <a
      href={'/acknowledgements'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Acknowledgements
    </a>
    <a
      href={'/licenses'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Licenses
    </a>
    <a
      href={'/open-source'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Open Source
    </a>
  </div>
)

const HelpMenu = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <a
      href={'https://support.dothq.co'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Support Centre
    </a>
    <a
      href={'https://support.dothq.co/report-issue'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Report an issue
    </a>
    <a
      href={'https://status.dothq.co'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      System Status
    </a>
  </div>
)

const AboutMenu = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <a href={'/about'} style={{ textDecoration: 'none', borderBottom: 'none' }}>
      About Dot HQ
    </a>
    <a
      href={'/about/open-source'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Open Source
    </a>
    <a
      href={'/acknowledgements'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Acknowledgements
    </a>
    <a
      href={'/about/privacy'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Privacy Policy
    </a>
    <a
      href={'/about/terms'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      Terms of Service
    </a>
    <a
      href={'/about/gdpr'}
      style={{ textDecoration: 'none', borderBottom: 'none' }}
    >
      GDPR
    </a>
  </div>
)

export const Header = ({
  primary,
  hasSexyGradient,
  seamless,
  children,
}: {
  primary?: boolean
  hasSexyGradient?: boolean
  seamless?: boolean
  children?: any
}) => {
  const [motd, setMotd] = React.useState(
    '💡 Dot Browser is still in alpha. Bugs may arise.'
  )
  const [footerItemsVisible, setFooterItemsVisible] = React.useState(false)
  const [detachOpen, setDetachOpen] = React.useState(false)
  const [detachHovering, setDetachHovering] = React.useState(false)
  const [fauxHovered, setFauxHovered] = React.useState(-1)
  const [hideCenter, setHC] = React.useState(false)
  const [lastCategory, setLC] = React.useState(-1)

  React.useEffect(() => {
    if (window.scrollY >= 120) {
      setHC(true)
    } else {
      setHC(false)
    }

    window.addEventListener('scroll', (e) => {
      if (window.scrollY >= 120) {
        setHC(true)
      } else {
        setHC(false)
      }
    })
  }, [hideCenter])

  const onNavItemHover = (i: number) => {
    setDetachOpen(true)
    setFauxHovered(i)
  }

  const onNavHoverExit = () => {
    setDetachOpen(false)
  }

  return (
    <>
      <nav
        className={`${primary ? `nav-nb` : ``} ${
          hasSexyGradient ? `nav-has-sexy-gradient` : ``
        } ${seamless ? `nav-seamless` : ``}`}
        style={{
          boxShadow: hideCenter ? `var(--nav-box-shadow)` : ``,
          transition: '0.4s box-shadow',
          backgroundColor: hideCenter ? `var(--background)` : ``,
        }}
      >
        <div className={`nav-container`}>
          <div className={'nav-left'} onMouseEnter={() => onNavHoverExit()}>
            <a className={'aexclude'} href={'/'}>
              <i className={'dot-icon'} />
            </a>
          </div>

          <div className={'nav-center'}>
            <ul className={'nav-items'}>
              {menus.map((menu, key) => (
                <a
                  className={`aexclude ${
                    fauxHovered === key && detachOpen ? `nav-item-selected` : ``
                  } ${!menu.component ? `nav-item-no-arrow` : ``}`}
                  onMouseOver={() => {
                    if (menu.href) {
                      setFauxHovered(key)
                      return onNavHoverExit()
                    }
                    onNavItemHover(key)
                  }}
                  key={key}
                  href={menu.href}
                >
                  {menu.name}
                  {menu.component && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      style={{ marginLeft: '8px' }}
                    >
                      <path
                        d="M9.00061 0.99997L5.00061 4.99997L1.00061 0.99997"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </a>
              ))}
            </ul>
          </div>

          <div className={'nav-right'} onMouseEnter={() => onNavHoverExit()}>
            <div className={'footer-socials footer-socials-header-override'}>
              <a
                title={'Twitter'}
                className={'aexclude'}
                href={'https://twitter.com/DotBrowser'}
                target={'_blank'}
              >
                <i className={'twitter-icon'}></i>
              </a>
              <a
                title={'Discord'}
                className={'aexclude'}
                href={'https://dothq.link/dsc'}
                target={'_blank'}
              >
                <i className={'discord-icon'}></i>
              </a>
              <a
                title={'Matrix'}
                className={'aexclude'}
                href={'https://dothq.link/matrix'}
                target={'_blank'}
              >
                <i className={'matrix-icon'}></i>
              </a>
            </div>

            <Button
              type={'primary'}
              href={'https://github.com/dothq/browser-desktop/releases'}
              lsp={12}
              iconRight={assets.forward}
              animateIcon
            >
              <L10n>GENERIC_DOWNLOAD_CTA</L10n>
            </Button>
          </div>
        </div>

        {true && (
          <div
            className={'nav-desktop-menu'}
            tabIndex={detachOpen ? 0 : -1}
            style={{
              width: '100%',
              pointerEvents: detachOpen ? `all` : `none`,
            }}
          >
            <div
              className={'nav-desktop-menu-container'}
              onMouseOver={() => {
                setDetachHovering(true)
                setDetachOpen(true)
              }}
              onMouseLeave={() => {
                setDetachOpen(false)
                setDetachHovering(false)
              }}
              style={{
                display: 'flex',
                transform: detachOpen ? `rotateX(0deg)` : ``,
                opacity: detachOpen ? 1 : 0,
                pointerEvents: detachOpen ? `all` : `none`,
                marginLeft: '100px',
              }}
            >
              {fauxHovered === 0 && <ProductsMenu />}
              {fauxHovered === 1 && <BlogMenu />}
              {fauxHovered === 2 && <HelpMenu />}
              {fauxHovered === 3 && <AboutMenu />}
            </div>
          </div>
        )}

        {children}
      </nav>

      <nav
        className={`mobile-nav ${
          hasSexyGradient ? `nav-has-sexy-gradient` : ``
        }`}
      >
        <div className={'nav-container'}>
          <div className={'nav-left'}>
            <a className={'aexclude'} href={''}>
              <i className={'dot-icon'} />
            </a>
          </div>

          <div className={'nav-right'}>
            <Button
              onClick={() => setFooterItemsVisible(!footerItemsVisible)}
              style={{ '--padding': '14px' }}
              type={'secondary'}
              href={'#'}
              iconLeft={'menu'}
            >
              <></>
            </Button>
          </div>
        </div>

        <div
          className={'nav-container'}
          style={{ display: footerItemsVisible ? '' : 'none' }}
        >
          <ul className={'mobile-nav-items'}>
            <li>
              <a href={'products'}>Products</a>
            </li>
            <li>
              <a href={'company'}>Company</a>
            </li>
            <li>
              <a href={'community'}>Community</a>
            </li>
            <li>
              <a href={'about'}>About</a>
            </li>
            <li className={'mobile-nav-btn'}>
              <Button type={'secondary'} href={'/id/signup'}>
                Register
              </Button>
            </li>
            <li className={'mobile-nav-btn'}>
              <Button type={'primary'} href={'/id/login'}>
                Sign in
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
