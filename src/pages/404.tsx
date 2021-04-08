import React from 'react'
import assets from '../assets'
import { Button } from '../components/Button'
import { Content } from '../components/Content'
import { Layout } from '../components/Layout'

class NotFound extends React.Component {
  public iconName = 'hmm'

  render() {
    const random = Math.random()

    if (random < 0.08) this.iconName = 'cryhmm'

    return (
      <Layout>
        <Content center fullHeight>
          <i className={`${this.iconName}-icon`}></i>
          <h1 style={{ marginTop: '24px' }}>404</h1>
          <p style={{ marginTop: '8px', marginBottom: '32px' }}>
            We couldn't find that page.
          </p>

          <Button type={'primary'} href={'/'} iconLeft={assets.back} rsp={12}>
            Go home
          </Button>
        </Content>
      </Layout>
    )
  }
}

export default NotFound
