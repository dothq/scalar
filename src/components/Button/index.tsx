import React from 'react'

/* tslint:disable */
export const Button = ({
  onClick,
  style,
  type,
  children,
  href,
  iconLeft,
  iconRight,
}: {
  onClick?: any
  style?: any
  type: 'primary' | 'secondary'
  children: any
  href: string
  iconLeft?: string
  iconRight?: string
}) => {
  return (
    <button onClick={onClick} className={`btn btn-${type}`} style={style}>
      <a href={href}>
        {iconLeft && (
          <i
            style={{ marginRight: '12px', filter: `var(--btn-${type}-icon)` }}
            className={`${iconLeft}-icon`}
          ></i>
        )}
        {children}
        {iconRight && (
          <i
            style={{ marginLeft: '12px', filter: `var(--btn-${type}-icon)` }}
            className={`${iconRight}-icon`}
          ></i>
        )}
      </a>
    </button>
  )
}
