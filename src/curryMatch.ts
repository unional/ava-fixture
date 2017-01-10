import { getLogger } from 'aurelia-logging'
import { ContextualTestContext } from 'ava'
import { compare } from 'dir-compare'
import { readFileSync, existsSync } from 'fs'
import { join, relative } from 'path'

const logger = getLogger('fixture')

export function curryMatch(baselinePath: string, resultPath: string, t: ContextualTestContext) {
  // here is ava cwd, which is the project root
  // Use this to do relative() with filename get good relative path.
  const cwd = process.cwd()
  return function match() {
    if (!existsSync(baselinePath)) {
      // TODO
      // Copy from result folder to baseline folder to start as a baseline
    }
    return compare(baselinePath, resultPath)
      .then((res) => {
        t.is(res.differences, 0, 'Some files / folders mismatch')
        res.diffSet.forEach(d => {
          const filename1 = join(d.path1, d.name1)
          const filename2 = join(d.path2, d.name2)
          const file1 = readFileSync(filename1).toString()
          const file2 = readFileSync(filename2).toString()
          if (file1 !== file2) {
            logger.error(`${relative(cwd, filename2)} does not match with baseline`)
          }
          t.is(file1, file2)
        })
      })
  }
}
