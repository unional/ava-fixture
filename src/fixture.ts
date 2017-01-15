import { readdirSync } from 'fs'
import { resolve, join } from 'path'
import test, {
  ContextualTestContext
} from 'ava'

import {
  ContextualDiffContext,
  fixtureTest,
  baselineTest,
  FixtureContextualBaselineEachTest
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

  function curry(testfn: (name: string, run: any) => any) {
    return ((
      title: string,
      caseName: string,
      run: (t: ContextualTestContext, d: ContextualDiffContext) => any
    ) => {
      const hasTitle = !!run
      if (!run) {
        // title is optional
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
      return testfn(`${hasTitle ? title + ' ' : ''}${caseName}`, (t: ContextualTestContext) => {
        if (baselinesPath) {
          d.match = curryMatch(d.baselinePath, d.resultPath, t)
        }

        // Inside each test, user may change the `cwd` of each case
        // so the target code can run correctly.
        // At the end of each test, restore the `cwd` to the original value.
        // doing `try-finally` and `thenable` to handle both sync and async.
        const cwd = process.cwd()
        try {
          const result = run(t, d)
          if (result && result.then) {
            return result.then(r => {
              process.chdir(cwd)
              return r
            }, e => {
              process.chdir(cwd)
              throw e
            })
          }
        }
        finally {
          process.chdir(cwd)
        }
      })
    })
  }

  function eachCurry(testfn: (name: string, run: any) => any) {
    return (
      filter: string | RegExp,
      run: FixtureContextualBaselineEachTest
    ) => {
      const absCasesPath = resolve(casesPath)

      // readdirSync reads both files and directories.
      let assets: string[] = readdirSync(absCasesPath).toString().split(',')

      if (!run) {
        // filter is optional
        run = filter as any
      }
      else {
        const regex = filter instanceof RegExp ? filter : new RegExp(filter)
        assets = assets.filter(d => regex.test(d))
      }

      const testResultPromises = assets.map(caseName => {
        const d: any = {
          caseName,
          casePath: join(absCasesPath, caseName)
        }
        if (baselinesPath) {
          d.baselinePath = resolve(baselinesPath, caseName)
          d.resultPath = resolve(resultsPath, caseName)
        }

        return testfn(caseName, (t: ContextualTestContext) => {
          if (baselinesPath) {
            d.match = curryMatch(d.baselinePath, d.resultPath, t)
          }

          // Inside each test, user may change the `cwd` of each case
          // so the target code can run correctly.
          // At the end of each test, restore the `cwd` to the original value.
          // doing `try-finally` and `thenable` to handle both sync and async.
          const cwd = process.cwd()
          try {
            const result: any = run(t, d)
            if (result && result.then) {
              return result.then(r => {
                process.chdir(cwd)
                return r
              }, e => {
                process.chdir(cwd)
                throw e
              })
            }
          }
          finally {
            process.chdir(cwd)
          }
        })
      })

      // fail if any testResultPromises fail?
      return Promise.all(testResultPromises)
    }
  }

  let fn: any = curry(ava)

  let others = {
    failing: curry(ava.failing),
    only: curry(ava.only),
    skip: curry(ava.skip),
    todo: ava.todo,
    each: eachCurry(ava)
  }

  for (let key in others) {
    (fn as any)[key] = (others as any)[key]
  }

  const eachFailing = eachCurry(ava.failing)

  fn.failing.only = others.only
  fn.failing.only.skip = others.skip
  fn.failing.skip = others.skip
  fn.failing.skip.only = others.only

  fn.only.failing = others.failing
  fn.only.failing.skip = others.skip
  fn.only.skip = others.skip
  fn.only.skip.failing = others.failing
  fn.only.each = others.each
  fn.only.each.failing = eachFailing

  fn.skip.failing = others.failing
  fn.skip.failing.only = others.only
  fn.skip.only = others.only
  fn.skip.only.failing = others.failing
  fn.skip.each = others.each
  fn.skip.each.failing = eachFailing

  fn.each.failing = eachFailing

  return fn
}
