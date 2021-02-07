import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/api/downloads', async (req, res) => {
  const product = req.query.product
  const os = req.query.os
  const channel = req.query.channel || 'stable'
  const architecture = req.query.arch || 64
  const language = req.query.language || 'en-US'
  let version = req.query.version || 'latest'

  if (version === 'latest') {
    const { data } = await axios.get(
      'https://raw.githubusercontent.com/dothq/browser-ff/main/package.json'
    )

    version = data.versions['firefox-display']
  }

  const baseURI = 'https://cdn.dothq.co'

  const fileType = os === 'windows' ? 'exe' : os === 'macos' ? 'dmg' : 'tar.bz2'
  const artifactName = `dot-${version}.${language}.${os}-x86${
    architecture === 64 ? '_64' : ''
  }.${fileType}`

  const downloadURI = [baseURI, 'artifacts', os, artifactName]

  if (req.query.noRedir) res.send(downloadURI.join('/'))
  else res.redirect(301, downloadURI.join('/'))
})

export default router
