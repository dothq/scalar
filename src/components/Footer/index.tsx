import React from 'react'

import { Button } from '../Button'

export const Footer = () => {
  return (
    <footer>
      <div className={'footer-container'}>
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
          <Button type={'secondary'} href={'/register'}>
            Register
          </Button>

          <Button type={'primary'} href={'/register'}>
            Sign in
          </Button>
        </div>
      </div>
    </footer>
  )
}
