import React from 'react'
import l10n from '../../l10n'

import '../../styles/footer.css'
import { L10n } from '../l10n'

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
            <L10n>PAGE_FOOTER_COPYRIGHT</L10n>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className={'footer-socials'}>
                <a
                  className={'aexclude'}
                  href={'https://twitter.com/DotBrowser'}
                  target={'_blank'}
                >
                  <i className={'twitter-icon'}></i>
                </a>
                <a
                  className={'aexclude'}
                  href={'https://github.com/dothq'}
                  target={'_blank'}
                >
                  <i className={'github-icon'}></i>
                </a>
                <a
                  className={'aexclude'}
                  href={'https://dothq.link/dsc'}
                  target={'_blank'}
                >
                  <i className={'discord-icon'}></i>
                </a>
                <a
                  className={'aexclude'}
                  href={'https://dothq.link/matrix'}
                  target={'_blank'}
                >
                  <i className={'matrix-icon'}></i>
                </a>
              </div>

              <a
                className={'aexclude'}
                style={{ marginLeft: '0.5rem' }}
                href={`/about/terms`}
              >
                Terms
              </a>
              <a
                className={'aexclude'}
                style={{ marginLeft: '1.5rem' }}
                href={`/about/privacy`}
              >
                Privacy
              </a>
            </div>
          </p>
        </div>
      </div>
    </footer>
  )
}
