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
          <a
            href={'/'}
            style={{ width: '36px', height: '36px', display: 'flex' }}
          >
            <i className={'dot-icon'} />
          </a>
          <p className={'logo-text'}>We are Dot HQ, the privacy brand.</p>

          <div className={'footer-socials'}>
            <a href={'https://twitter.com/DotBrowser'} target={'_blank'}>
              <i className={'twitter-icon'}></i>
            </a>
            <a href={'https://dothq.co/join'} target={'_blank'}>
              <i className={'discord-icon'}></i>
            </a>
            <a
              href={'https://www.youtube.com/channel/UCgmXI2ccMKSTPNCij4_6Ubw'}
              target={'_blank'}
            >
              <i className={'youtube-icon'}></i>
            </a>
          </div>
        </div>
        <ul className={'footer-list'}>
          <li className={'footer-list-group'}>
            <h1>Resources</h1>
            <a href={'https://status.dothq.co'}>Status</a>
            <a href={'https://github.com/dothq'}>Open Source</a>
            <a href={'/blog'}>Blog</a>
          </li>
          <li className={'footer-list-group'} style={{ marginRight: 0 }}>
            <h1>Legal</h1>
            <a href={'/legal/terms'}>Terms</a>
            <a href={'/legal/privacy'}>Privacy</a>
            <a href={'/legal/cookies'}>Cookies</a>
            <a href={'/legal/gdpr'}>GDPR</a>
          </li>
        </ul>
      </div>
      {/* <Line className={"sign-up-line"} />
            <Container className={"sign-up-container"}>
                <div className={"sign-up-title"} style={{ display: 'flex', flex: 1 }}>
                    <Subtitle className={"register-sub"}>Register for a Dot ID, it's free.</Subtitle>
                </div>
                <div style={{ display: 'flex' }}>
                    <SignupForm>
                        <SignupInput type={"email"} placeholder={"Enter your email address"} ref={emailRef} onKeyUp={onEmailKeyUp} />
                        <Button href={"/register"} ref={registerBtnRef} style={{ borderRadius: '0 100px 100px 0' }}>Register</Button>
                    </SignupForm>
                </div>
            </Container> */}
    </footer>
  )
}
