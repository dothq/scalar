import React from 'react'

import { Layout } from '../components/Layout'
import style from '../styles/home.module.css'
import {
  Lock,
  Mail,
  Migrate,
  OpenSource,
  Shield,
  Sparkles,
} from '../assets/home'
import { Button } from '../components/Button'

class Home extends React.Component {
  render() {
    return (
      <Layout>
        <div className={style.layout}>
          <div className={style.grid}>
            <div>
              <img
                src="/assets/landing-showcase.png"
                alt="Dot Browser design"
              />
            </div>

            <div>
              <h1>Take back your privacy.</h1>
              <p>
                Dot Browser is a privacy-conscious web browser with smarts
                built-in for protection against trackers and advertisements
                online.
              </p>

              <div>
                <Button
                  onClick={() => {}}
                  type="secondary"
                  href="/products/browser"
                >
                  Learn more
                </Button>

                <Button
                  onClick={() => {}}
                  type="primary"
                  href="https://github.com/dothq/browser-pr-builds/releases"
                >
                  Download now
                </Button>
              </div>
            </div>
          </div>

          <div className={style.section}>
            <h2>
              We built a privacy browser in a world where your personal data is
              sold to the highest bidder.
            </h2>
            <p>
              Your data is constantly being sold through large advertisement
              networks tracking what sites you like to visit online.
            </p>
          </div>

          <div className={style.features}>
            <div>
              <img src={Lock} alt="" />
              <h3>Respects your privacy</h3>
              <p>
                We never send telemetry or crash reports without your consent.
              </p>
            </div>

            <div>
              <img src={Sparkles} alt="" />
              <h3>Make Dot Browser yours</h3>
              <p>
                Browse our library of thousands of themes and extensions to get
                Dot just how you like it.
              </p>
            </div>

            <div>
              <img src={Mail} alt="" />
              <h3>Protect your mailbox</h3>
              <p>
                We will offer to mask your email address when you sign up for
                sites or services.
              </p>
            </div>

            <div>
              <img src={Shield} alt="" />
              <h3>Block nasty ads and trackers</h3>
              <p>
                We will offer to mask your email address when you sign up for
                sites or services.
              </p>
            </div>

            <div>
              <img src={Migrate} alt="" />
              <h3>Migrate from Chrome or Edge</h3>
              <p>
                Dot can migrate all your data from your previous browser in just
                a few clicks.
              </p>
            </div>

            <div>
              <img src={OpenSource} alt="" />
              <h3>Powered by Open Source</h3>
              <p>
                Dot is built on top of open-source software meaning the source
                code is open to anyone.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Home
