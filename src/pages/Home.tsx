import React from 'react'

import { Layout } from '../components/Layout'

import { Button } from '../components/Button'
import { BUI } from '../components/BUI'
import { FeatureGrid } from '../components/FeatureGrid'

import '../styles/home.css'
import { Content } from '../components/Content'
import { osIcons } from '../assets/os'
import { Header } from '../components/Header'
import { L10n } from '../components/l10n'
import assets from '../assets/home'

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
      <Content primary bgStyle={'wow'}>
        <Header seamless />

        <div className={'grid'}>
          <div>
            <h1 className={'landing-super-title'}>
              <L10n>SUPER_LANDING_PAGE_MASTHEAD</L10n>
            </h1>
            <p>
              <L10n>SUPER_LANDING_PAGE_BODY</L10n>
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
          <h2>Privacy is a right, not a privilege.</h2>
          <p style={{ marginTop: '1rem' }}>
            Your data is constantly being sold through large advertisement
            networks that track what sites you like to visit online.
          </p>
        </div>
      </Content>
      <Content>
        <FeatureGrid id={'features'} />
      </Content>
      <Content>
        <div className={'section sponsors-section'} style={{ color: "black" }}>
          <h2>Our sponsors</h2>
          <p style={{ marginTop: '1rem' }}>
            The following organisations have graciously provided support to Dot HQ:
          </p>

          <br /><br />

          <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
            <a href="https://tutanota.com" target={"_blank"} style={{ color: "black", textDecoration: "none" }}>
              <img src={assets.tutanotaSponsor} alt="Tutanota"></img>
              <p>Providing email services</p> 
            </a>

          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default Home
