import Markdown from 'markdown-to-jsx'
import React, { Component, useState } from 'react'
import { RouteComponentProps, useParams, withRouter } from 'react-router-dom'
import { Content } from '../../components/Content'
import { Layout } from '../../components/Layout'

interface Params {
  key: string
  product: string
  page: string
}

interface Props extends RouteComponentProps<Params> {
  // custom properties passed to component
}

class Page extends Component<Props> {
  state = {
    index: undefined,
    markdown: undefined,
  }

  componentDidMount() {
    // Fetch the list of builds
    this.fetch()
  }

  async fetch() {
    const { key, product, page } = this.props.match.params

    const index = await (
      await fetch(
        'https://cdn.statically.io/gh/dothq/helpdesk/gh-pages/index.json'
      )
    ).json()

    this.setState({ ...this.state, index })

    const productIndex = index.filter((prod: any) => prod.name === product)[0]
      .entries
    const keyIndex = productIndex.filter((os: any) => os.key === key)[0].files
    const file = keyIndex[page]

    const markdown = await (await fetch(file)).text()

    this.setState({ ...this.state, markdown })
  }

  render() {
    const { markdown } = this.state
    return (
      <Layout>
        <Content>
          {typeof markdown !== 'undefined' && <Markdown>{markdown || ""}</Markdown>}
        </Content>
      </Layout>
    )
  }
}

export default withRouter(Page)
