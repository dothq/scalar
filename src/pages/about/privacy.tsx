import React from 'react'

import { Layout } from '../../components/Layout'

import '../../styles/home.css'
import { Content } from '../../components/Content'
import { AboutSidebar } from './components/Sidebar'

import PrivacyPolicy from '../../markdown/PRIVACY_POLICY.md'

const AboutPrivacy = () => {
  return (
    <Layout>
      <Content bgStyle={'dot'} centerHoriz primary>
        <h5>WHO ARE WE?</h5>
        <h1>We are Dot HQ.</h1>
      </Content>
      <Content centerHoriz>
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}
        >
          <AboutSidebar selected={'privacy-db'} />
          <div style={{ paddingLeft: '2.5%' }}>
            <PrivacyPolicy />
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default AboutPrivacy
