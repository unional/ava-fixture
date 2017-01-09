import { resolve, relative } from 'path'
import test, {
  ContextualTestContext,
  ContextualCallbackTest,
  ContextualTest
} from 'ava'

import {
  AfterRunner,
  BeforeRunner,
  FixtureCallbackRunner,
  FixtureContextualCallbackTest,
  FixtureContextualCallbackTestFunction,
  FixtureContextualSerialTest,
  FixtureContextualSerialTestFunction,
  FixtureContextualTest,
  FixtureContextualTestFunction,
  FixtureRunner,
  FixtureTest
} from './interfaces'

export namespace Ava {
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

/**
 * Creates fixture test.
 * `cwd` is set to the case directory during the test.
 * @param ava The ava module function (`import ava from 'ava'`).
 * @param path Absolute or relative path to the fixture cases parent directory. In ava@0.17, cwd for relative path is set to the project root, instead of test file location.
 */
export default function fixture(ava: typeof test, path: string): FixtureTest {
  function curry<T>(testfn: (name: string, run: any) => any): T {
    return ((
      title: string,
      caseName: string,
      run: (t: ContextualTestContext, absolutePath: string, relativePath: string) => any
    ) => {
      if (!run) {
        // name is optional
        run = caseName as any
        caseName = title
      }

      const fixturePath = resolve(path, caseName)
      return testfn(`${title ? title + ' ' : ''}(fixture: ${caseName})`, (t: any) => {
        let result: any
        const cwd = process.cwd()
        try {
          process.chdir(fixturePath)
          result = run(t, fixturePath, relative(cwd, fixturePath))
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
