import { resolve } from 'path'
import test, {
  ContextualTestContext
} from 'ava'

import {
  ContextualDiffContext,
  fixtureTest,
  baselineTest
} from './interfaces'

import { curryMatch } from './curryMatch'

/**
 * Creates fixture test.
 * `cwd` will be set to the case directory during the test.
 * @param ava The ava module function (`import ava from 'ava'`).
 * @param casesPath Absolute or relative path (from project root) to the fixture cases parent directory.
 * @param baselinesPath Absolute or relative path (from project root) to the fixture baselines parent directory.
 * @param resultsPath Absolute or relative path (from project root) to the fixture results parent directory.
 */
export function fixture(ava: typeof test, casesPath: string, baselinesPath: string, resultsPath: string): typeof baselineTest
export function fixture(ava: typeof test, casesPath: string): typeof fixtureTest
export function fixture(ava: typeof test, casesPath: string, baselinesPath?: string, resultsPath?: string) {
  if (baselinesPath && !resultsPath) {
    throw new Error('baselines and results must be specified together')
  }

  function curry<T>(testfn: (name: string, run: any) => any): T {
    return ((
      title: string,
      caseName: string,
      run: (t: ContextualTestContext, d: ContextualDiffContext) => any
    ) => {
      if (!run) {
        // name is optional
        run = caseName as any
        caseName = title
      }

      let d: any = {
        casePath: resolve(casesPath, caseName)
      }
      if (baselinesPath) {
        d.baselinePath = resolve(baselinesPath, caseName)
        d.resultPath = resolve(resultsPath, caseName)
      }
      return testfn(`${title ? title + ' ' : ''}(fixture: ${caseName})`, (t: ContextualTestContext) => {
        let result: any
        const cwd = process.cwd()
        try {
          if (baselinesPath) {
            d.match = curryMatch(d.baselinePath, d.resultPath, t)
          }
          process.chdir(d.casePath)
          result = run(t, d)
          if (result && result.then) {
            return result.then((r: any) => {
              process.chdir(cwd)
              return r
            })
          }
        }
        finally {
          process.chdir(cwd)
        }
      })
    }) as any
  }

  let fn: any = curry(ava)

  let others = {
    failing: curry(ava.failing),
    only: curry(ava.only),
    skip: curry(ava.skip),
    todo: ava.todo
  }

  for (let key in others) {
    (fn as any)[key] = (others as any)[key]
  }

  fn.failing.only = others.only
  fn.failing.skip = others.skip
  fn.only.failing = others.failing
  fn.skip.failing = others.failing

  return fn
}
