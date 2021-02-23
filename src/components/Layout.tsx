import React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'

import '../styles.css'

export const Layout = ({
  children,
  primary,
  hasSexyGradient
}: {
  children?: any
  primary?: boolean
  hasSexyGradient?: boolean
}) => {
  return (
    <>
      <section className={`hero ${hasSexyGradient ? `hero-has-sexy-gradient` : ``}`}>
        <Header primary={primary} hasSexyGradient={hasSexyGradient} />
        {children}
        <Footer />
      </section>
    </>
  )
}
