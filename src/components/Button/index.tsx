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
  className,
  disabled,
}: {
  onClick?: any
  style?: any
  type?: 'primary' | 'secondary' | 'text'
  children: any
  href?: string
  iconLeft?: string
  iconRight?: string
  className?: string
  disabled?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${type ? `btn-${type}` : ''} ${
        className ? className : ``
      } ${disabled ? `btn-disabled` : ``}`}
      style={style}
    >
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
