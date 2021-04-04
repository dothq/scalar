import React from 'react'

import { Layout } from '../../../components/Layout'

import '../../../styles/home.css'
import { Content } from '../../../components/Content'
import { AboutSidebar } from '../components/Sidebar'

import Gdpr from '../../../markdown/GDPR.md'

const AboutPrivacyGDPR = () => {
  return (
    <Layout>
      <Content bgStyle={'dot'} centerHoriz primary>
        <h5>GDPR DOCUMENT</h5>
        <h1>Simplified privacy information</h1>
      </Content>
      <Content centerHoriz>
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}
        >
          <AboutSidebar selected={'privacy-gdpr'} />
          <div style={{ paddingLeft: '2.5%' }}>
            <Gdpr />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default AboutPrivacyGDPR
