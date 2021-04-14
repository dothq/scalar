import React from 'react'
import { Icon } from '../Icon'

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
  lsp,
  rsp,
  iconSize,
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
  lsp?: number
  rsp?: number
  iconSize?: number
}) => {
  return (
    <a
      onClick={onClick}
      href={href}
      className={`btn ${type ? `btn-${type}` : ''} ${
        className ? className : ``
      } ${disabled ? `btn-disabled` : ``}`}
      style={style}
    >
      {iconLeft && (
        <Icon
          lsp={lsp || 0}
          rsp={rsp}
          i={iconLeft}
          size={iconSize || 14}
        ></Icon>
      )}
      {children}
      {iconRight && (
        <Icon
          lsp={lsp || 0}
          rsp={rsp}
          i={iconRight}
          size={iconSize || 14}
        ></Icon>
      )}
    </a>
  )
}
