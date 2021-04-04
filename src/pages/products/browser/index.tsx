import React from 'react'
import { BUI } from '../../../components/BUI'
import { Button } from '../../../components/Button'
import { FeatureGrid } from '../../../components/FeatureGrid'

import { Layout } from '../../../components/Layout'
import { Content } from '../../../components/Content'

import assets from '../../../assets'

import '../../../styles/products/index.css'

const Browser = () => {
  const [os, setOS] = React.useState('')
  const [advancedVisible, setAdvancedVisible] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const { platform, userAgent } = window.navigator

    if (platform.toLowerCase() === 'win32') setOS('Windows')
    else if (platform.toLowerCase() === 'macintel') setOS('macOS')
    else if (platform.toLowerCase().includes('linux')) setOS('Linux')
    else if (
      platform.toLowerCase().includes('mobile') ||
      userAgent.toLowerCase().includes('android') ||
      userAgent.toLowerCase().includes('iphone')
    )
      setOS('Mobile')
    else setAdvancedVisible(true)
  }, [os])

  return (
    <Layout hasSexyGradient>
      <Content centerHoriz>
        <img
          src={assets.browserWordmark}
          style={{ filter: 'var(--btn-secondary-icon)' }}
        ></img>
        <h1
          style={{ maxWidth: '600px', textAlign: 'center', marginTop: '22px' }}
        >
          Get the browser that fights for your privacy.
        </h1>
        <p style={{ maxWidth: '516px', textAlign: 'center' }}>
          Get the browser that respects your privacy, blocks trackers and is
          easy to use by default.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '46px',
          }}
        >
          <Button
            onClick={() => (window.location.href = `/products/browser/thanks`)}
            type="primary"
            disabled={os === 'Mobile'}
            iconLeft={os.toLowerCase()}
          >
            {os === 'Mobile' ? `Mobile Coming Soon` : `Download for ${os}`}
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '16px',
          }}
        >
          {advancedVisible && (
            <>
              <Button
                href="/products/browser/thanks?os=windows"
                type="secondary"
              >
                Download Dot for Windows
              </Button>
              <Button href="/products/browser/thanks?os=macos" type="secondary">
                Download Dot for macOS
              </Button>
              <Button href="/products/browser/thanks?os=linux" type="secondary">
                Download Dot for Linux
              </Button>
            </>
          )}

          <Button
            onClick={() => setAdvancedVisible(!advancedVisible)}
            type="text"
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            {advancedVisible ? 'Less' : 'More'} options
          </Button>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <BUI />
        </div>

        <div style={{ marginTop: '4rem' }}>
          <FeatureGrid />
        </div>
      </Content>
    </Layout>
  )
}

export default Browser
