import axios from 'axios'
import React from 'react'

import Markdown from 'markdown-to-jsx'

import { Button } from '../Button'

export const Header = ({
  primary
}: {
  primary?: boolean
}) => {
  const [motd, setMotd] = React.useState('')
  const [footerItemsVisible, setFooterItemsVisible] = React.useState(false)

  React.useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/dothq/motd/main/motd.md')
      .then((res) => setMotd(res.data))
      .catch((err) => {
        console.log(err)
      })
  }, [motd])

  return (
    <>
      <nav className={'motd'}>
        <div className={'nav-container'}>
          <Markdown options={{ forceInline: true }}>{motd}</Markdown>
        </div>
      </nav>

      <nav className={primary ? `nav-nb` : ``}>
        <div className={`nav-container`}>
          <div className={'nav-left'}>
            <a href={'/'}>
              <i className={'dot-icon'} />
            </a>
            <ul className={'nav-items'}>
              <a href={'/products'}>Products</a>
              <a href={'/company'}>Company</a>
              <a href={'/community'}>Community</a>
              <a href={'/about'}>About</a>
            </ul>
          </div>

          <div className={'nav-right'}>
            <Button type={'secondary'} href={'/id/signup'}>
              Register
            </Button>

            <Button type={'primary'} href={'/id/login'}>
              Sign in
            </Button>
          </div>
        </div>
      </nav>

      <nav className={'mobile-nav'}>
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
            <li className={"mobile-nav-btn"}>
              <Button type={'secondary'} href={'/id/signup'}>
                Register
              </Button>
            </li>
            <li className={"mobile-nav-btn"}>
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
