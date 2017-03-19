import { fixture as f } from './fixture'

export default f
export * from './interfaces'

import { readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const cache = {}

export function fixture(dir) {
  const absDir = resolve(dir)
  cache[absDir] = {}

  const entries = readdirSync(absDir)
  entries.forEach(entry => {
    const id = isDirectory(absDir, entry) ? 'd' : 'f'
    const node = cache[absDir][id] || (cache[absDir][id] = [])
    node.push(entry)
  })
  return {
    directory(name, cb: (d: { name: string, path: string }) => any) {
      cb({
        name,
        path: resolve(absDir, name)
      })
    },
    eachFile(cb: (d: { name: string, path: string, filename: string }) => any) {
      cache[absDir].f.forEach(filename => {
        cb({
          filename,
          name: filename.slice(0, filename.lastIndexOf('.')),
          path: resolve(absDir, filename)
        })
      })
    },
    eachDirectory(cb: (d: { name: string, path: string }) => any) {
      cache[absDir].d.forEach(name => {
        cb({
          name,
          path: join(absDir, name)
        })
      })
    }
  }
}

function isDirectory(path, name) {
  const stat = statSync(join(path, name))
  return stat.isDirectory()
}
