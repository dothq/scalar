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
            © {new Date().getFullYear()} Dot HQ. All rights reserved.
            <div style={{ display: 'flex', alignItems: "center" }}>
              <select id="language-switcher" value={l10n.currentLanguage} onSelect={_ => {
                window.location.href = window.location.href.replace(
                  `/${l10n.currentLanguage}`, 
                  (document.getElementById("language-switcher") as any).value
                )
              }}>
                {l10n.availableLanguages.map(lang => (
                  <option value={lang}>
                    {l10n.hydrate("LANGUAGE_DISPLAY_NAME", { lang })}
                  </option>
                ))}
              </select>
              <div className={'footer-socials'}>
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

              <a style={{ marginLeft: '0.5rem' }} href={'about/terms'}>
                Terms
              </a>
              <a style={{ marginLeft: '1.5rem' }} href={'about/privacy'}>
                Privacy
              </a>
            </div>
          </p>
        </div>
      </div>
    </footer>
  )
}
