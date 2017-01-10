import {
  Test,
  ContextualCallbackTest,
  ContextualTest,
  ContextualTestContext,
  ContextualCallbackTestContext,
  Observable
} from 'ava'

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

export interface ContextualDiffContext {
  /**
   * Path of the case folder
   */
  casePath: string
}

export interface ContextualBaselineDiffContext extends ContextualDiffContext {
  /**
   * Path of the case's baseline folder
   */
  baselinePath: string

  /**
   * Path of the case's result folder
   */
  resultPath: string

  /**
   * Check if the baseline folder and the result folder matches.
   * If not, error will be thrown.
   */
  match(): Promise<void>
}

export type FixtureContextualBaselineTest = (t: ContextualTestContext, d: ContextualBaselineDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

export type FixtureContextualBaselineSerialTest = (t: ContextualTestContext, d: ContextualBaselineDiffContext) => void

export type FixtureContextualBaselineCallbackTest = (t: ContextualCallbackTestContext, d: ContextualBaselineDiffContext) => void

/**
 * The fixture text context (the callback function).
 */
export type FixtureContextualTest = (t: ContextualTestContext, d: ContextualDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

export interface FixtureContextualBaselineTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   * In this function, `cwd` is the fixture case folder.
   */
  (title: string, caseName: string, run: FixtureContextualBaselineTest): void
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualBaselineTest): void
}

export interface FixtureContextualTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   * In this function, `cwd` is the fixture case folder.
   */
  (title: string, caseName: string, run: FixtureContextualTest): void
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualTest): void
}

export interface FixtureRunner extends FixtureContextualTestFunction {
  skip: FixtureRunner
  cb: FixtureCallbackRunner
}

export interface FixtureCallbackRunner extends FixtureContextualTestFunction {
  cb: FixtureCallbackRunner
}

export interface FixtureBaselineTest extends FixtureContextualBaselineTestFunction {
  todo(title: string): void

  only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export interface FixtureTest extends FixtureContextualTestFunction {
  todo(title: string): void

  only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}
