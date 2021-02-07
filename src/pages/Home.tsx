import React from 'react'

import { Layout } from '../components/Layout'

import { Button } from '../components/Button'
import { BUI } from '../components/BUI'
import { FeatureGrid } from '../components/FeatureGrid'

import '../styles/home.css'

const Home = () => {
  return (
    <Layout>
      <div>
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

        <div className={'section'}>
          <h2>
            We built a privacy browser in a world where your personal data is
            sold to the highest bidder.
          </h2>
          <p>
            Your data is constantly being sold through large advertisement
            networks tracking what sites you like to visit online.
          </p>
        </div>

        <FeatureGrid id={'features'} />
      </div>
    </Layout>
  )
}

export default Home
