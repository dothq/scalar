import React, { Component } from 'react'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'

class Download extends Component {
  constructor(props: any) {
    super(props)

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    // Fetch the list of builds
    this.fetchBuilds()
  }

  async fetchBuilds() {
    const data = await (
      await fetch(
        'https://cdn.statically.io/gh/dothq/browser-pr-builds/main/releases.json'
      )
    ).json()

    this.setState({ data })
  }

  render() {
    return (
      <Layout>
        <h1>Browser Downloads</h1>

        {this.state && (
          <>
            {/* <h2>Stable</h2>

            <Button>Windows</Button>
            <Button>MacOS</Button>
            <Button>Linux</Button>

            <h2>Beta</h2>

            <Button>Windows</Button>
            <Button>MacOS</Button>
            <Button>Linux</Button>

            <h2>Nightly</h2>

            <Button>Windows</Button>
            <Button>MacOS</Button>
            <Button>Linux</Button> */}
          </>
        )}

        <h2>Stable</h2>
      </Layout>
    )
  }
}

export default Download
