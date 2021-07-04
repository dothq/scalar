import React from 'react'

import { Layout } from '../components/Layout'

import { Button } from '../components/Button'
import { BUI } from '../components/BUI'
import { FeatureGrid } from '../components/FeatureGrid'

import '../styles/home.css'
import { Content } from '../components/Content'
import { osIcons } from '../assets/os'
import { Header } from '../components/Header'
import { Cards } from '../components/Cards'
import { FAQ } from '../components/FAQ'
import { L10n } from '../components/l10n'
import assets from '../assets'
import l10n from '../l10n'

const Home = () => {
  const [os, setOS] = React.useState('');
  const [lang, setLang] = React.useState('');

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const { platform } = window.navigator

    if (platform.toLowerCase() === 'win32') setOS('windows')
    else if (platform.toLowerCase() === 'macintel') setOS('macos')
    else if (platform.toLowerCase().includes('linux')) setOS('linux');

    if(l10n.currentLanguage) setLang(l10n.currentLanguage);
  })

  return (
    <Layout primary noHeader>
      <Header seamless={true} />
      <Content primary fullHeight ignoreMtop isHome style={{ minHeight: "92vh" }}>
        <div className={'grid'} style={lang ? { 
            maxWidth: lang !== "en" ? "1660px" : "1000px",
            opacity: lang ? 1 : 0
        } : {}}>
          <h1 className={'landing-super-title'}>
            <L10n>SUPER_LANDING_PAGE_MASTHEAD</L10n>
          </h1>
          <p className={'landing-super-p'}>
            <L10n>SUPER_LANDING_PAGE_BODY</L10n>
          </p>

          <div className={'grid-btns'}>
            <Button
              type="primary"
              href="https://github.com/dothq/browser-desktop/releases"
              iconLeft={(osIcons as any)[os.toLowerCase()]}
              rsp={12}
              iconSize={16}
            >
              <L10n>SUPER_LANDING_PAGE_CTA</L10n>
            </Button>

            <Button
              type="secondary"
              href="#cards"
              lsp={12}
              iconRight={assets.forward}
              animateIcon
            >
              <L10n>GENERIC_LEARN_MORE</L10n>
            </Button>
          </div>
          <div id={"cards"}></div>
        </div>
      </Content>
      <Content>
        <Cards />
      </Content>
      <Content style={{ alignItems: "flex-start", paddingTop: "6rem" }}>
        <h1 style={{ marginBottom: "32px" }}>Frequently Asked Questions</h1>
        <FAQ />
      </Content>
      <Content style={{ paddingBottom: "6rem" }}>
        <div style={{ width: "418px", padding: "0 3rem" }}>
          <Button href="/products/desktop/download" iconLeft={"/assets/download.svg"} iconSize={28} rsp={16} type={"primary"} style={{ fontSize: "28px", height: "80px" }}>Download Dot Browser</Button>
        </div>
      </Content>
    </Layout>
  )
}

export default Home
