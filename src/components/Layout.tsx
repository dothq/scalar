import React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'

import '../styles.css'

export const Layout = ({
  children,
  primary,
  hasSexyGradient,
  noHeader,
  fullHeight,
  style
}: {
  children?: any
  primary?: boolean
  hasSexyGradient?: boolean
  noHeader?: boolean
  fullHeight?: boolean
  style?: any
}) => {
  return (
    <>
      <section
        className={`hero ${hasSexyGradient ? `hero-has-sexy-gradient` : ``} ${fullHeight ? `hero-vh`: ``} ${fullHeight && noHeader ? `hero-vh-ignore-mtop` : ``}`}
        style={{ marginTop: fullHeight && noHeader ? `` : `0px`, ...style }}
      >
        {!noHeader && (
          <Header primary={primary} hasSexyGradient={hasSexyGradient} />
        )}
        {children}
        <Footer />
      </section>
    </>
  )
}
