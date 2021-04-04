import React from 'react'

import { Layout } from '../../components/Layout'

import '../../styles/home.css'
import { Content } from '../../components/Content'

import { Contributors } from '../../components/Contributors'

export const Community = () => (
  <Layout>
    <Content centerHoriz>
      <h1>Dot is made possible by the amazing community</h1>
      <p>We would like to thank the community that makes our work possible</p>

      <span className="separator" />
      <span className="separator" />

      <h2>Browser</h2>
      <p>
        All of these amazing people have worked to make Dot Browser a reality.
      </p>

      <span className="separator" />
      <h4>Desktop browser</h4>
      <Contributors owner="dothq" repo="browser-desktop" />

      <span className="separator" />
      <h4>Dot Shield</h4>
      <Contributors owner="dothq-extensions" repo="adblock" />

      <span className="separator" />
      <h4>New tab page</h4>
      <Contributors owner="dothq" repo="ntp" />

      <span className="separator" />
      <h4>Website</h4>
      <Contributors owner="dothq" repo="new.dothq.co" />

      <span className="separator" />
      <p>
        We want to thank the wonderful work that the mozilla community has done.
        They have made this project possible. The cliqz team have done a bunch
        of great work that we are referencing to help us build a better browser.
        If you want to be a part of our work on a better, more private browser,
        feel free to <a href="https://github.com/dothq">contribute on GitHub</a>{' '}
        or <a href="/join">join our Discord</a>.
      </p>
    </Content>
  </Layout>
)
