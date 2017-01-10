import { resolve } from 'path'
import test, {
  ContextualTestContext
} from 'ava'

import {
  ContextualDiffContext,
  FixtureContextualTestFunction,
  FixtureBaselineTest,
  FixtureTest
} from './interfaces'

import { curryMatch } from './curryMatch'

/**
 * Creates fixture test.
 * `cwd` is set to the case directory during the test.
 * @param ava The ava module function (`import ava from 'ava'`).
 * @param path Absolute or relative path to the fixture cases parent directory. In ava@0.17, cwd for relative path is set to the project root, instead of test file location.
 */
export function fixture(ava: typeof test, casesPath: string, baselinesPath: string, resultsPath: string): FixtureBaselineTest
export function fixture(ava: typeof test, casesPath: string): FixtureTest
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

  let fn = curry<FixtureContextualTestFunction>(ava)

  let others = {
    only: curry<FixtureContextualTestFunction>(ava.only),
    skip: curry<FixtureContextualTestFunction>(ava.skip),
    todo: ava.todo
  }

  for (let key in others) {
    (fn as any)[key] = (others as any)[key]
  }

  return fn
}
