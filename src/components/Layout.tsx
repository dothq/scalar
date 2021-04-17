import React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'

import '../styles.css'

export const Layout = ({
  children,
  primary,
  hasSexyGradient,
  noHeader
}: {
  children?: any
  primary?: boolean
  hasSexyGradient?: boolean
  noHeader?: boolean
}) => {
  return (
    <>
      <section
        className={`hero ${hasSexyGradient ? `hero-has-sexy-gradient` : ``}`}
      >
        {!noHeader && <Header primary={primary} hasSexyGradient={hasSexyGradient} />}
        {children}
        <Footer />
      </section>
    </>
  )
}
