import React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'

import '../styles.css'

export const Layout = ({
  children,
  center,
  centerHoriz,
  fullHeight,
}: {
  children: any
  center?: boolean
  centerHoriz?: boolean
  fullHeight?: boolean
}) => {
  return (
    <>
      <section className={'hero'}>
        <Header />
        <div className={`hero-container ${fullHeight ? `hero-vh` : ``}`}>
          <div
            className={`hero-content ${
              centerHoriz ? `hero-center-horiz` : center ? `hero-center` : ``
            }`}
          >
            {children}
          </div>
          <Footer />
        </div>
      </section>
    </>
  )
}
