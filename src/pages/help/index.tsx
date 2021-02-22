import React from 'react'
import { Content } from '../../components/Content'

import { Layout } from '../../components/Layout'

const Help = () => (
  <Layout>
    <Content>
      <div
        style={{
          textAlign: 'center',
          minHeight: '10vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Help</h1>
      </div>
    </Content>
  </Layout>
)

export default Help
