import React from 'react'

export const Content = ({
  children,
  center,
  centerHoriz,
  fullHeight,
  primary,
  bgStyle,
  style,
  containerStyle,
  ignoreMtop,
  isHome
}: {
  children: any
  center?: boolean
  centerHoriz?: boolean
  fullHeight?: boolean
  primary?: boolean
  bgStyle?: string
  style?: any
  containerStyle?: any
  ignoreMtop?: boolean
  isHome?: boolean
}) => {
  return (
    <div
      className={`hero-container ${fullHeight ? `hero-vh` : ``} ${
        primary ? `hero-primary` : ``
      } ${bgStyle ? `hero-bg-${bgStyle}` : ``} ${ignoreMtop ? `hero-ignore-mtop` : ``} ${isHome ? `hero-is-home` : ``}`}
      style={containerStyle}
    >
      <div
        className={`hero-content ${
          centerHoriz ? `hero-center-horiz` : center ? `hero-center` : ``
        }`}
        style={style}
      >
        {children}
      </div>
    </div>
  )
}
