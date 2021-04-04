import { useUserAgent } from '@oieduardorabelo/use-user-agent'
import axios from 'axios'
import React from 'react'
import { BUI } from '../../../components/BUI'
import { Button } from '../../../components/Button'
import { Content } from '../../../components/Content'
import { FeatureGrid } from '../../../components/FeatureGrid'

import { Layout } from '../../../components/Layout'

import '../../../styles/products/index.css'

const BrowserThanks = () => {
  const [os, setOS] = React.useState('linux')

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('DOMContentLoaded', async () => {
      const parameters = new URLSearchParams(window.location.search)

      // We are assigning the current os to a local variable as running setOS
      // doesn't affect the os variable during the lifecycle of this function
      let fnos = 'linux'

      if (parameters.has('os')) {
        fnos = parameters.get('os') || 'linux'
      } else {
        const { platform, userAgent } = window.navigator

        if (platform.toLowerCase() === 'win32') {
          fnos = 'windows'
        } else if (platform.toLowerCase() === 'macintel') {
          fnos = 'macos'
        } else if (
          platform.toLowerCase().includes('mobile') ||
          userAgent.toLowerCase().includes('android') ||
          userAgent.toLowerCase().includes('iphone')
        )
          return
      }

      setOS(fnos)

      const { data } = await axios.get(
        'https://raw.githubusercontent.com/dothq/browser-ff/main/package.json'
      )

      const fileName = 
      fnos === 'windows' 
          ? `Install.Dot.Browser.${data.versions['firefox-display']}.exe` 
          : fnos === 'macos' 
            ? `Dot.Browser.${data.versions['firefox-display']}.dmg`
            : `dot-${data.versions['firefox-display']}.tar.bz2`
  
      const downloadURI = `https://github.com/dothq/browser-desktop/releases/latest/download/${fileName}`

      window.location.replace(downloadURI)
    })
  }, [])

  return (
    <Layout>
      <Content center fullHeight>
        <i className={'dot-browser-icon'} style={{ marginBottom: '18px' }} />
        <h1>Thanks for downloading!</h1>
        <p style={{ maxWidth: '516px', textAlign: 'center' }}>
          Get ready to run the Dot Browser installer.
          <br />
          Didn't work?
          <Button
            href={`/api/downloads?product=browser&os=${os}`}
            type={'text'}
            style={{
              '--padding': '0px 4px',
              fontSize: '16px',
              color: 'var(--text-primary)',
            }}
          >
            Try downloading again.
          </Button>
        </p>
      </Content>
    </Layout>
  )
}

export default BrowserThanks
