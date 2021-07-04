import React from 'react'
import { StyledSubHeader } from './style'

export const SubHeader = ({
  transparent,
  children,
}: {
  transparent?: boolean
  children: any
}) => {
  return (
    <StyledSubHeader
      className={'nav-step-header'}
      style={{
        backgroundColor: transparent ? 'transparent' : '',
      }}
    >
      <div
        style={{
          boxShadow: transparent ? 'inset 0px -1px 0px 0px var(--border)' : '',
        }}
      >
        {children}
      </div>
    </StyledSubHeader>
  )
}
