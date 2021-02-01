import React from 'react';

import { Layout } from '../components/Layout'

class Home extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <h1>Take back your privacy.</h1>
          <p>
          Dot Browser is a privacy-conscious web browser with smarts built-in for protection against trackers and advertisements online.
          </p>
        </div>
      </Layout>
    );
  }
}

export default Home;
