import React from 'react'

import assets from '../../assets/home'

export const BUI = () => {
  const [buiImage, setBuiImage] = React.useState(assets.browserGlass)
  const [buiReady, setBuiReady] = React.useState(false)

  React.useEffect(() => {
    let i: any = new Image()
    i.src = buiImage

    i.addEventListener('load', () => {
      setBuiReady(true)
      i = null
    })
  }, [buiImage])

  return (
    <div className={'landing-showoff'} style={{ opacity: buiReady ? 1 : 0 }}>
      <img src={buiImage} id="browser-ui" width="800" height="492" />
    </div>
  )
}
