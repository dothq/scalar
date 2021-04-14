import React from 'react'

import '../../styles/footer.css'

export const a = ({ href, children }: { href?: string; children: any }) => (
  <a href={href}>{children}</a>
)

export const Externala = ({
  href,
  children,
}: {
  href: string
  children: any
}) => <a href={href}>{children}</a>

export const Footer = () => {
  return (
    <footer className={'footer'}>
      <div className={'footer-container'}>
        <div className={'footer-info'} style={{ flex: 1, width: '100%' }}>
          <p className={'logo-text'}>
            © {new Date().getFullYear()} Dot HQ. All rights reserved.
            <div style={{ display: 'flex' }}>
              <div className={'footer-socials'}>
                <a href={'https://twitter.com/DotBrowser'} target={'_blank'}>
                  <i className={'twitter-icon'}></i>
                </a>
                <a href={'https://github.com/dothq'} target={'_blank'}>
                  <i className={'github-icon'}></i>
                </a>
                <a href={'https://dothq.co/join'} target={'_blank'}>
                  <i className={'discord-icon'}></i>
                </a>
              </div>

              <a style={{ marginLeft: '0.5rem' }} href={'/legal/terms'}>
                Terms
              </a>
              <a style={{ marginLeft: '1.5rem' }} href={'/legal/privacy'}>
                Privacy
              </a>
            </div>
          </p>
        </div>
      </div>
    </footer>
  )
}
