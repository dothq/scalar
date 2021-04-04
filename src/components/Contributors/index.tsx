import React, { Component } from 'react'
import { Octokit } from '@octokit/core'

import { Contributor } from '../Contributor'

type Props = {
  owner: string
  repo: string
}

type State = {
  contributors: {
    login?: string
    id?: number
    node_id?: string
    avatar_url?: string
    gravatar_id?: string
    url?: string
    html_url?: string
    followers_url?: string
    following_url?: string
    gists_url?: string
    starred_url?: string
    subscription_url?: string
    type: string
    name?: string
  }[]
}

export class Contributors extends Component<Props> {
  state: State = { contributors: [] }
  octokit = new Octokit()

  componentDidMount() {
    // Download all of the contributors
    this.octokit
      .request('GET /repos/{owner}/{repo}/contributors', {
        owner: this.props.owner,
        repo: this.props.repo,
      })
      .then((response) => this.setState({ contributors: response.data }))
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'center',
        }}
      >
        {this.state.contributors.map(
          (contributor) =>
            contributor.type === 'User' && (
              <Contributor
                name={contributor.login as string}
                avatar={contributor.avatar_url as string}
                profile={contributor.html_url as string}
              />
            )
        )}
      </div>
    )
  }
}
