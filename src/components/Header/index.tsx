import axios from 'axios'
import React from 'react'

import ReactTooltip from 'react-tooltip'

import Markdown from 'markdown-to-jsx'

import { Button } from '../Button'
import { menus } from '../../menus'
import assets from '../../assets'

export const Header = ({
  primary,
  hasSexyGradient,
  seamless,
}: {
  primary?: boolean
  hasSexyGradient?: boolean
  seamless?: boolean
}) => {
  const [motd, setMotd] = React.useState(
    '💡 Dot Browser is still in alpha. Bugs may arise.'
  )
  const [footerItemsVisible, setFooterItemsVisible] = React.useState(false)
  const [detachOpen, setDetachOpen] = React.useState(false)
  const [fauxHovered, setFauxHovered] = React.useState(0)

  React.useEffect(() => {
    // axios
    //   .get('https://raw.githubusercontent.com/dothq/motd/main/motd.md')
    //   .then((res) => setMotd(res.data))
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // @todo reenable motd
  }, [motd])

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
      >
        <div className={`nav-container`}>
          <div className={'nav-left'}>
            <a href={'/'}>
              <i className={'dot-icon'} />
            </a>
          </div>

          <div className={'nav-center'}>
            <ul className={'nav-items'} onMouseLeave={() => onNavHoverExit()}>
              {menus.map((menu, key) => (
                <a
                  className={
                    fauxHovered === key && detachOpen
                      ? `nav-item-faux-hovered`
                      : ``
                  }
                  onMouseOver={() => onNavItemHover(key)}
                  key={key}
                >
                  {menu.name}
                </a>
              ))}
            </ul>
          </div>

          <div className={'nav-right'}>
            <div className={'footer-socials footer-socials-header-override'}>
              <a href={'https://twitter.com/DotBrowser'} target={'_blank'}>
                <i className={'twitter-icon'}></i>
              </a>
              <a href={'https://github.com/dothq'} target={'_blank'}>
                <i className={'github-icon'}></i>
              </a>
              <a href={'https://dothq.link/dsc'} target={'_blank'}>
                <i className={'discord-icon'}></i>
              </a>
            </div>

            <Button
              type={'primary'}
              href={'https://github.com/dothq/browser-desktop/releases'}
              lsp={12}
              iconRight={assets.forward}
            >
              Download
            </Button>
          </div>
        </div>

        {/* <nav
          className={`nav-desktop-detachable ${detachOpen ? `is-open` : ``}`}
          onMouseOver={() => setDetachOpen(true)}
          onMouseLeave={() => onNavHoverExit()}
        >
          {menus.map((menu, key) => (
            <menu.component
              key={key}
              highlighted={fauxHovered}
              id={menu.name}
              visible={detachOpen ? fauxHovered === key : false}
            />
          ))}
        </nav> */}
      </nav>

      <nav
        className={`mobile-nav ${
          hasSexyGradient ? `nav-has-sexy-gradient` : ``
        }`}
      >
        <div className={'nav-container'}>
          <div className={'nav-left'}>
            <a href={''}>
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

      {/* <div
        className={`nav-desktop-detachable-coverup ${
          detachOpen ? `is-open` : ``
        }`}
        onMouseEnter={() => onNavHoverExit()}
        style={{ '--detached-height': '350px' } as any}
      ></div> */}
    </>
  )
}
