import { fixture as f } from './fixture'

export default f
export * from './interfaces'

import { readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const cache = {}
export function fixture(dir) {
  const absDir = resolve(dir)
  cache[absDir] = {}

  const files = readdirSync(absDir)
  files.forEach(file => {
    const stat = statSync(join(absDir, file))
    const id = stat.isDirectory() ? 'd' : 'f'
    const node = cache[absDir][id] || (cache[absDir][id] = [])
    node.push(file)
  })
  return {
    eachFile(cb) {
      cache[absDir].f.forEach(filename => {
        cb({
          filename,
          name: filename.slice(0, filename.lastIndexOf('.')),
          path: resolve(absDir, filename)
        })
      })
    },
    eachDirectory(cb) {
      cache[absDir].d.forEach(name => {
        cb({
          name,
          path: join(absDir, name)
        })
      })
    }
  }
}
