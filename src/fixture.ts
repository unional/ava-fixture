import { join, resolve, relative } from 'path'
import test, {
  ContextualTestContext,
  ContextualCallbackTest,
  ContextualTest
} from 'ava'

import {
  AfterRunner,
  BeforeRunner,
  ContextualBaselineDiffContext,
  ContextualDiffContext,
  FixtureCallbackRunner,
  FixtureContextualCallbackTest,
  FixtureContextualCallbackTestFunction,
  FixtureContextualSerialTest,
  FixtureContextualSerialTestFunction,
  FixtureContextualBaselineTest,
  FixtureContextualTest,
  FixtureContextualTestFunction,
  FixtureOptions,
  FixtureRunner,
  FixtureBaselineTest,
  FixtureTest
} from './interfaces'

import { curryMatch } from './curryMatch'

namespace Ava {
  export interface ContextualTestFunction {
    (name: string, run: ContextualTest): void
    (run: ContextualTest): void
  }

  export interface TestFunction {
    (name: string, implementation: Test): void
    (implementation: Test): void
  }

  export interface ContextualCallbackTestFunction {
    (name: string, run: ContextualCallbackTest): void
    (run: ContextualCallbackTest): void
  }

  export interface Test extends ContextualTestFunction {
    before: ContextualTestFunction
    after: ContextualTestFunction
    beforeEach: TestFunction
    afterEach: TestFunction

    skip: ContextualTestFunction
    only: ContextualTestFunction

    serial: ContextualTestFunction
    failing: ContextualCallbackTestFunction
    cb: ContextualCallbackTestFunction
    todo(name: string): void
  }
}

export const fixtureDefaultOptions: FixtureOptions = {
  casesPath: 'cases',
  baselinesPath: 'baselines',
  resultsPath: 'results'
}

/**
 * Creates fixture test.
 * `cwd` is set to the case directory during the test.
 * @param ava The ava module function (`import ava from 'ava'`).
 * @param path Absolute or relative path to the fixture cases parent directory. In ava@0.17, cwd for relative path is set to the project root, instead of test file location.
 */
export function fixture(ava: typeof test, path: string, options: FixtureOptions): FixtureBaselineTest
export function fixture(ava: typeof test, path: string): FixtureTest
export function fixture(ava: typeof test, path: string, options?: FixtureOptions) {
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

      let d
      if (options) {
        d = {
          casePath: resolve(path, options.casesPath, caseName),
          baselinePath: resolve(path, options.baselinesPath, caseName),
          resultPath: resolve(path, options.resultsPath, caseName)
        }
      }
      else {
        d = {
          casePath: resolve(path, caseName)
        }
      }
      return testfn(`${title ? title + ' ' : ''}(fixture: ${caseName})`, (t: ContextualTestContext) => {
        let result: any
        const cwd = process.cwd()
        try {
          if (options) {
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
    serial: curry<FixtureContextualSerialTestFunction>(ava.serial),
    todo: ava.todo,
    cb: curry<FixtureContextualCallbackTestFunction>(ava.cb),
    failing: curry<FixtureContextualCallbackTestFunction>(ava.failing),
    before: ava.before,
    beforeEach: ava.beforeEach,
    after: ava.after,
    afterEach: ava.afterEach
  }

  for (let key in others) {
    (fn as any)[key] = (others as any)[key]
  }

  return fn as FixtureTest // fn as typeof fn & typeof others
}
