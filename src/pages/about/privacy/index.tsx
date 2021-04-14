import React from 'react'

import { Layout } from '../../../components/Layout'

import '../../../styles/home.css'
import { Content } from '../../../components/Content'
import { AboutSidebar } from '../components/Sidebar'

import PrivacyPolicy from '../../../markdown/PRIVACY_POLICY.md'

import './privacy.css'

const AboutPrivacy = () => {
  return (
    <Layout>
      <Content centerHoriz>
        <div id="privacy">
          <blockquote>
            Some information in our privacy policy is out of date, we are working on rewriting this.
          </blockquote>
          <PrivacyPolicy />
        </div>
      </Content>
    </Layout>
  )
}

export default AboutPrivacy
