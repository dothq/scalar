import React, { Component } from 'react'
import { Button } from '../components/Button'
import { Content } from '../components/Content'
import { Layout } from '../components/Layout'

import styles from '../styles/downloads.module.css'

interface DownloadState {
  data: null | any
}

class Download extends Component {
  state: DownloadState = {
    data: null,
  }

  constructor(props: any) {
    super(props)
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
    const data = this.state.data

    return (
      <Layout>
        <Content>
          <h1>Browser Downloads</h1>

          {data && (
            <>
              <div className={styles.option}>
                <div>
                  <h2>Stable</h2>

                  <p>
                    Tried, tested and stable. This is recommended for people who
                    want a browser that is safe, private and just works.
                  </p>
                </div>

                <div>
                  <Button
                    href={data.stable.windows || '#'}
                    className={!data.stable.windows ? styles.disabled : ''}
                    type="primary"
                  >
                    Windows
                  </Button>
                  <Button
                    href={data.stable.mac || '#'}
                    className={!data.stable.mac ? styles.disabled : ''}
                    type="primary"
                  >
                    MacOS
                  </Button>
                  <Button
                    href={data.stable.linux || '#'}
                    className={!data.stable.linux ? styles.disabled : ''}
                    type="primary"
                  >
                    Linux
                  </Button>
                </div>
              </div>

              <div className={styles.option}>
                <div>
                  <h2>Beta</h2>

                  <p>
                    Get faster updates with more features whilst having most of
                    the initial bugs being patched.
                  </p>
                </div>

                <div>
                  <Button
                    href={data.beta.windows || '#'}
                    className={!data.beta.windows ? styles.disabled : ''}
                    type="primary"
                  >
                    Windows
                  </Button>
                  <Button
                    href={data.beta.mac || '#'}
                    className={!data.beta.mac ? styles.disabled : ''}
                    type="primary"
                  >
                    MacOS
                  </Button>
                  <Button
                    href={data.beta.linux || '#'}
                    className={!data.beta.linux ? styles.disabled : ''}
                    type="primary"
                  >
                    Linux
                  </Button>
                </div>
              </div>

              <div className={styles.option}>
                <div>
                  <h2>Nightly</h2>
                  <p>
                    Updates fresh out of the oven, without the icing. There will
                    be bugs, but you get the newest features.
                  </p>
                </div>

                <div>
                  <Button
                    href={data.nightly.windows || '#'}
                    className={!data.nightly.windows ? styles.disabled : ''}
                    type="primary"
                  >
                    Windows
                  </Button>
                  <Button
                    href={data.nightly.mac || '#'}
                    className={!data.nightly.mac ? styles.disabled : ''}
                    type="primary"
                  >
                    MacOS
                  </Button>
                  <Button
                    href={data.nightly.linux || '#'}
                    className={!data.nightly.linux ? styles.disabled : ''}
                    type="primary"
                  >
                    Linux
                  </Button>
                </div>
              </div>
            </>
          )}
        </Content>
      </Layout>
    )
  }
}

export default Download
