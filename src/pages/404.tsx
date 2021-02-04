import React from 'react'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'

class NotFound extends React.Component {
  public iconName = 'hmm'

  render() {
    const random = Math.random()

    if (random < 0.08) this.iconName = 'cryhmm'

    return (
      <Layout center fullHeight>
        <i className={`${this.iconName}-icon`}></i>
        <h1 style={{ marginTop: '24px' }}>404</h1>
        <p style={{ marginTop: '8px', marginBottom: '32px' }}>
          We couldn't find that page.
        </p>

        <Button type={'primary'} href={'/'} iconLeft={'back'}>
          Go home
        </Button>
      </Layout>
    )
  }
}

export default NotFound
