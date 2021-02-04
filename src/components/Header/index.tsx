import React from 'react'

import { Button } from '../Button'

export const Header = () => {
  const [footerItemsVisible, setFooterItemsVisible] = React.useState(false)

  return (
    <>
      <nav>
        <div className={'nav-container'}>
          <div className={'nav-left'}>
            <a href={'/'}>
              <i className={'dot-icon'} />
            </a>
            <ul className={'nav-items'}>
              <li>
                <a href={'/products'}>Products</a>
              </li>
              <li>
                <a href={'/company'}>Company</a>
              </li>
              <li>
                <a href={'/community'}>Community</a>
              </li>
              <li>
                <a href={'/about'}>About</a>
              </li>
            </ul>
          </div>

          <div className={'nav-right'}>
            <Button type={'secondary'} href={'/register'}>
              Register
            </Button>

            <Button type={'primary'} href={'/register'}>
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
              style={{ padding: '14px' }}
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
          </ul>
        </div>
      </nav>
    </>
  )
}
