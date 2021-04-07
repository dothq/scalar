import { readFileSync } from 'fs'
import { resolve } from 'path'

const data: any = {
  '/about/privacy': readFileSync(
    resolve(process.cwd(), 'src', 'markdown', 'PRIVACY_POLICY.md'),
    'utf-8'
  ),
}

export default data
