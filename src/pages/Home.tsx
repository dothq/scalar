import React from 'react'

import { Layout } from '../components/Layout'

import { Button } from '../components/Button'
import { BUI } from '../components/BUI'
import { FeatureGrid } from '../components/FeatureGrid'

import '../styles/home.css'
import { Content } from '../components/Content'
import { osIcons } from '../assets/os'
import { Header } from '../components/Header'

const Home = () => {
  const [os, setOS] = React.useState('')

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const { platform } = window.navigator

    if (platform.toLowerCase() === 'win32') setOS('windows')
    else if (platform.toLowerCase() === 'macintel') setOS('macos')
    else if (platform.toLowerCase().includes('linux')) setOS('linux')
  })

  return (
    <Layout primary noHeader>
      <Header seamless />

      <Content primary bgStyle={'wow'}>
        <div className={'grid'}>
          <div>
            <h1 className={'landing-super-title'}>
              The browser with privacy at heart.
            </h1>
            <p>
              Dot Browser is a privacy-conscious web browser with smarts
              built-in for protection against trackers and advertisements
              online.
            </p>

            <div className={'grid-btns'}>
              <Button
                onClick={() => console.log('Button')}
                type="primary"
                href="https://github.com/dothq/browser-desktop/releases"
                iconLeft={(osIcons as any)[os.toLowerCase()]}
                rsp={12}
                iconSize={16}
              >
                Download Dot Browser (Alpha)
              </Button>

              <Button
                onClick={() => console.log('Button')}
                type="secondary"
                href="#features"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </Content>
      <BUI />
      <Content style={{ marginTop: '-18vmin', padding: '6rem 0' }}>
        <div className={'section privacy-section'}>
          <h2>
            We built a privacy browser in a world where your personal data is
            sold to the highest bidder.
          </h2>
          <p style={{ marginTop: '1rem' }}>
            Your data is constantly being sold through large advertisement
            networks that track what sites you like to visit online.
          </p>
        </div>
      </Content>
      <Content>
        <FeatureGrid id={'features'} />
      </Content>
    </Layout>
  )
}

export default Home
