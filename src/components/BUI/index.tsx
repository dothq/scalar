import React from 'react'

import assets from '../../assets/home'

export const BUI = () => {
  const [buiImage, setBuiImage] = React.useState('')
  const [buiReady, setBuiReady] = React.useState(false)

  React.useEffect(() => {
    const isAprilFools = new Date().toString().includes("Apr 01 2021");

    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      setBuiImage(isAprilFools ? assets.browserLightApr : assets.browserLight)
    else setBuiImage(isAprilFools ? assets.browserApr : assets.browser)

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
      <img
        id="browser-wallpaper"
        src={(new Date().toString().includes("Apr 01 2021")) ? assets.rickrolled : `https://source.unsplash.com/collection/67042424/600x292`}
        width="800"
        height="492"
      />
    </div>
  )
}
