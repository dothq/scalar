import React from 'react'

import assets from '../../assets/home'

export const BUI = () => {
  const [buiImage, setBuiImage] = React.useState('')
  const [buiReady, setBuiReady] = React.useState(false)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      setBuiImage(assets.browserGlassDark)
    else setBuiImage(assets.browserGlass)

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
