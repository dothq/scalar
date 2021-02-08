import React from 'react'
import { Button } from '../../../components/Button'

import { Layout } from '../../../components/Layout'

const Compass = () => (
  <Layout centerHoriz>
    <span style={{ marginTop: '20vh' }}></span>

    <img
      src="https://cdn.jsdelivr.net/npm/twemoji@11.0.1/2/svg/1f9ed.svg"
      alt="🧭"
      style={{ width: '36px', marginBottom: '18px' }}
    />
    <h1>Compass</h1>
    <p style={{ maxWidth: '516px', textAlign: 'center' }}>
      Compass is the new tab page for Dot Browser. With beautiful backgrounds,
      weather, news and more, Compass is a leap above the default new tab page
      for Firefox.
    </p>

    <span className="gap"></span>

    <div>
      <Button type="primary" href="http://ntp.dothq.co/">
        Try it
      </Button>
    </div>

    <span style={{ marginTop: '30vh' }}></span>

    <div
      style={{
        width: '80vw',
        height: '60vh',
      }}
    >
      <iframe
        src="https://ntp.dothq.co/"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          boxShadow:
            'rgba(0, 0, 0, 0.10) 0px 5px 16px 6px, rgba(0, 0, 0, 0.10) 0px 0px 8px 1px',
        }}
      ></iframe>
    </div>
  </Layout>
)

export default Compass
