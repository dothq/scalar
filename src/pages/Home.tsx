import React from 'react'

import { Layout } from '../components/Layout'

import { Button } from '../components/Button'
import { BUI } from '../components/BUI'
import { FeatureGrid } from '../components/FeatureGrid'

import '../styles/home.css'
import { Content } from '../components/Content'

const Home = () => {
  return (
    <Layout primary>
      <Content primary>
        <div className={'grid'}>
          <div>
            <h1>Take back your privacy.</h1>
            <p>
              Dot Browser is a privacy-conscious web browser with smarts
              built-in for protection against trackers and advertisements
              online.
            </p>

            <div className={'grid-btns'}>
              <Button
                onClick={() => console.log('Button')}
                type="secondary"
                href="#features"
              >
                Learn more
              </Button>

              <Button
                onClick={() => console.log('Button')}
                type="primary"
                href="/products/browser"
              >
                Download Dot Browser
              </Button>
            </div>
          </div>

          <BUI />
        </div>
      </Content>
      <Content>
        <div className={'section'}>
          <h2>
            We built a privacy browser in a world where your personal data is
            sold to the highest bidder.
          </h2>
          <p style={{ marginTop: "1rem" }}>
            Your data is constantly being sold through large advertisement
            networks that track what sites you like to visit online.
          </p>
        </div>

        <FeatureGrid id={'features'} />
      </Content>
    </Layout>
  )
}

export default Home
