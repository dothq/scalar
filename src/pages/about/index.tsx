import React from 'react'

import { Layout } from '../../components/Layout'

import { Button } from '../../components/Button'
import { BUI } from '../../components/BUI'
import { FeatureGrid } from '../../components/FeatureGrid'

import '../../styles/home.css'
import { Content } from '../../components/Content'

const AboutHome = () => {
  return (
    <Layout>
      <Content bgStyle={"dot"} centerHoriz>
        <h5>OUR MISSION</h5>
        <h1>We want to stop companies from taking advantage of your data.</h1>
      </Content>
    </Layout>
  )
}

export default AboutHome
