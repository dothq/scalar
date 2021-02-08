import React from 'react'
import { Button } from '../components/Button'

import { Layout } from '../components/Layout'

import styles from '../styles/about.module.css'

const About = () => {
  if (typeof window !== 'undefined' && window.location.hash === '')
    window.location.hash = 'about'

  return (
    <Layout>
      <div id="about" className={styles.container}>
        <div className="flex-center" style={{ height: '80vh' }}>
          <h1>We are Dot HQ</h1>
          <p>Keeping privacy alive and driving the world forward.</p>
        </div>

        <div className="flex-center" style={{ minHeight: '20vh' }}>
          <p>
            We are an active group of open source contributors striving to make
            a company with privacy built to our core. We pledge to remain open
            and private in a world that doesn't care about it.
          </p>
        </div>

        <div className="flex-center" style={{ minHeight: '20vh' }}>
          <p>
            Our foremost product is Dot Browser, a firefox fork with less bloat
            and better privacy features. We include a fast and efficient tracker
            blocker and email protection. Additionally, we have stripped out all
            of mozilla's telemetry and annoyances.
          </p>
        </div>

        <div className="flex-center" style={{ minHeight: '20vh' }}>
          <p>
            We have lots of new ideas that we want to try out, from a operating
            system, to a sync system and new tab page.
          </p>
        </div>

        <div className="flex-center" style={{ minHeight: '20vh' }}>
          <h2>Want more?</h2>

          <div>
            <Button type="primary" href="/products/browser">
              Download dot browser
            </Button>
            <span className="vgap"></span>
            <Button type="secondary" href="/join">
              Join us on discord
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
