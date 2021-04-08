import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/api/downloads', async (req, res) => {
  const os = req.query.os
  let version = req.query.version || 'latest'

  if (version === 'latest') {
    const { data } = await axios.get(
      'https://raw.githubusercontent.com/dothq/browser-ff/main/package.json'
    )

    version = data.versions['firefox-display']
  }

  const fileName =
    os === 'windows'
      ? `Install.Dot.Browser.${version}.exe`
      : os === 'macos'
      ? `Dot.Browser.${version}.dmg`
      : `dot-${version}.tar.bz2`

  const downloadURI = `https://github.com/dothq/browser-desktop/releases/latest/download/${fileName}`

  if (req.query.noRedir) res.send(downloadURI)
  else res.redirect(301, downloadURI)
})

export default router
