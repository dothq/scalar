import React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'

import '../styles.css'

export const Layout = ({
  children,
  primary
}: {
  children?: any
  primary?: boolean
}) => {
  return (
    <>
      <section className={'hero'}>
        <Header primary={primary} />
        {children}
        <Footer />
      </section>
    </>
  )
}
