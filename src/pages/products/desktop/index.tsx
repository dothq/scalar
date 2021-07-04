import React from 'react'
import { BUI } from '../../../components/BUI'
import { Button } from '../../../components/Button'
import { FeatureGrid } from '../../../components/FeatureGrid'

import { Layout } from '../../../components/Layout'
import { Content } from '../../../components/Content'
import { Header } from '../../../components/Header'
import { SubHeader } from '../../../components/SubHeader'

import assets from '../../../assets'

import '../../../styles/products/index.css'
import { L10n } from '../../../components/l10n'

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
    <Layout primary noHeader>
      <Header seamless={true}>
        <SubHeader transparent>
          <div>
            <a className={"aexclude"} href={"/products/desktop"}>
              <h1>Dot Browser for Desktop</h1>
            </a>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <Button href={"/products/desktop/features"} type={"text"} style={{ height: "40px", padding: "0 14px" }}>Features</Button>
            <Button href={"/products/desktop/comparison"} type={"text"} style={{ height: "40px", padding: "0 14px" }}>Comparison</Button>
            <Button href={"/products/desktop/whats-new"} type={"text"} style={{ height: "40px", padding: "0 14px" }}>What's New</Button>
            <Button href={"/products/desktop/download"} type={"primary"} style={{ height: "34px", marginLeft: "12px" }}>Download</Button>
          </div>
        </SubHeader>
      </Header>
      <Content primary fullHeight>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      </Content>
    </Layout>
  )
}

export default Browser
