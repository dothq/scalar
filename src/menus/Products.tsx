import React from 'react'
import { StyledMenu, MenuContent, MenuItem } from './style'

export const Products = ({
  id,
  visible,
  highlighted,
}: {
  id: string
  visible: boolean
  highlighted: number
}) => {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => setReady(true), [ready])

  return (
    <StyledMenu id={id} visible={highlighted === 0 && visible}>
      <MenuContent>
        <div className={'menu-grid'}>
          <MenuItem>
            <i className={'product-icon browser-desktop-pi'}></i>
            <div>
              <h1>Dot Browser for Desktop</h1>
              <p>
                A privacy-conscious web browser based on Firefox, made for
                Windows, macOS, and Linux.
              </p>
            </div>
          </MenuItem>
          <MenuItem>
            <i className={'product-icon browser-mobile-pi'}></i>
            <div>
              <h1>Dot Browser for Android</h1>
              <p>Your favourite privacy-conscious web browser, for Android.</p>
            </div>
          </MenuItem>
          <MenuItem>
            <i className={'product-icon dot-id-pi'}></i>
            <div>
              <h1>Dot Browser for Android</h1>
              <p>Your favourite privacy-conscious web browser, for Android.</p>
            </div>
          </MenuItem>
          <MenuItem>
            <i className={'product-icon dot-shield-pi'}></i>
            <div>
              <h1>Dot Browser for Android</h1>
              <p>Your favourite privacy-conscious web browser, for Android.</p>
            </div>
          </MenuItem>
          <MenuItem>
            <i className={'product-icon compass-pi'}></i>
            <div>
              <h1>Dot Browser for Android</h1>
              <p>Your favourite privacy-conscious web browser, for Android.</p>
            </div>
          </MenuItem>
        </div>
      </MenuContent>
    </StyledMenu>
  )
}
