import { fixture as f } from './fixture'

export default f
export * from './interfaces'

import fs = require('fs')
import path = require('path')

const cache = {}
export function fixture(dir) {
  const absDir = path.resolve(dir)
  cache[absDir] = {}

  const files = fs.readdirSync(absDir)
  files.forEach(file => {
    const stat = fs.statSync(path.join(absDir, file))
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
          path: path.resolve(absDir, filename)
        })
      })
    },
    eachDirectory(cb) {
      cache[absDir].d.forEach(name => {
        cb({
          name,
          path: path.join(absDir, name)
        })
      })
    }
  }
}
