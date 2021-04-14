import React from 'react'

import { Layout } from '../../components/Layout'

import { Button } from '../../components/Button'
import { BUI } from '../../components/BUI'
import { FeatureGrid } from '../../components/FeatureGrid'

import '../../styles/home.css'
import { Content } from '../../components/Content'
import { AboutSidebar } from './components/Sidebar'

import TOS from '../../markdown/TERMS_OF_SERVICE.md'

import { PrivacyStyle } from '../about/privacy/style'

const AboutTerms = () => {
  return (
    <Layout>
      <PrivacyStyle />
      <Content centerHoriz>
        <div id="privacy">
          <TOS />
        </div>
      </Content>
    </Layout>
  )
}

export default AboutTerms
