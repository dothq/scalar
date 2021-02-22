import React from 'react';

export const Content = ({
    children,
    center,
    centerHoriz,
    fullHeight,
    primary,
    bgStyle
  }: {
    children: any
    center?: boolean
    centerHoriz?: boolean
    fullHeight?: boolean
    primary?: boolean
    bgStyle?: 'dot' | 'colour'
}) => {
    return (
        <div className={`hero-container ${fullHeight ? `hero-vh` : ``} ${primary ? `hero-primary` : ``} ${bgStyle ? `hero-bg-${bgStyle}` : ``}`}>
            <div
                className={`hero-content ${
                    centerHoriz ? `hero-center-horiz` : center ? `hero-center` : ``
                }`}
            >
                {children}
            </div>
        </div>
    )
}