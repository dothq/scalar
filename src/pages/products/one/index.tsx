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

const One = () => {
  return (
    <Layout primary noHeader>
      <Header seamless={true}>
        <SubHeader transparent>
          <div>
            <a className={'aexclude'} href={'/products/one'}>
              <h1>Dot One</h1>
            </a>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <Button
              href={'/products/one/features'}
              type={'text'}
              style={{ height: '40px', padding: '0 14px' }}
            >
              Features
            </Button>
            <Button
              href={'/products/one/whats-new'}
              type={'text'}
              style={{ height: '40px', padding: '0 14px' }}
            >
              What's New
            </Button>
            <Button
              href={'https://one.dothq.co'}
              type={'primary'}
              style={{ height: '34px', marginLeft: '12px' }}
            >
              Sign in
            </Button>
          </div>
        </SubHeader>
      </Header>
      <Content primary fullHeight>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Content>
    </Layout>
  )
}

export default One
