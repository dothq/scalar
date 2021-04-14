import React from 'react'

import { Layout } from '../../components/Layout'

import { Button } from '../../components/Button'
import { BUI } from '../../components/BUI'
import { FeatureGrid } from '../../components/FeatureGrid'

import '../../styles/home.css'
import { Content } from '../../components/Content'
import { AboutSidebar } from './components/Sidebar'

const AboutGDPR = () => {
  return (
    <Layout>
      <Content bgStyle={'dot'} centerHoriz primary>
        <h5>WHO ARE WE?</h5>
        <h1>We are Dot HQ.</h1>
      </Content>
      <Content centerHoriz>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            width: '100%',
          }}
        >
          <AboutSidebar selected={'gdpr'} />
          <div style={{ width: '100%' }}>This page is under construction!</div>
        </div>
      </Content>
    </Layout>
  )
}

export default AboutGDPR
