import React from 'react'
import { Button } from '../../components/Button'
import { Layout } from '../../components/Layout'

import styles from '../../styles/id/sign.module.css'

const Login = () => (
  <Layout>
    <div className={styles.prompt}>
      <img
        src="https://cdn.jsdelivr.net/npm/twemoji@11.0.1/2/svg/1f44b.svg"
        alt="👋"
        style={{ width: '64px' }}
      />
      <h1>Log in to your Dot ID</h1>

      <span className="gap"></span>
      <span className="gap"></span>

      <form>
        <input type="email" name="email" placeholder="me@dothq.co" />
        <input type="password" name="password" placeholder="Password" />

        <span className="gap"></span>

        <Button type="primary">Login</Button>
        <Button type="text" href="/id/signup">
          Need an account? Sign up
        </Button>
      </form>
    </div>
  </Layout>
)

export default Login
