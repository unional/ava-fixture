import {
  ContextualTestContext,
  ContextualCallbackTestContext,
  Observable
} from 'ava'

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
  match(): Promise<any> | void
}

export type FixtureContextualBaselineTest = (t: ContextualTestContext, d: ContextualBaselineDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

/**
 * The fixture text context (the callback function).
 */
export type FixtureContextualTest = (t: ContextualTestContext, d: ContextualDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

/**
 * Runs a fixture test.
 * @param title Title of the test (for display and filtering).
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 * In this function, `cwd` is the fixture case folder.
 */
export function fixtureTest(title: string, caseName: string, run: FixtureContextualTest): void;

/**
 * Runs a fixture test.
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 */
export function fixtureTest(caseName: string, run: FixtureContextualTest): void;

export namespace fixtureTest {
  export function todo(title: string): void

  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.failing {
  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.failing.only {
  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.failing.skip {
  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.only {
  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.only.failing {
  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.only.skip {
  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.skip {
  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.skip.failing {
  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.skip.only {
  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

/**
 * Runs a fixture test.
 * @param title Title of the test (for display and filtering).
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 * In this function, `cwd` is the fixture case folder.
 */
export function baselineTest(title: string, caseName: string, run: FixtureContextualBaselineTest): void;

/**
 * Runs a fixture test.
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 */
export function baselineTest(caseName: string, run: FixtureContextualBaselineTest): void;

export namespace baselineTest {
  export function todo(title: string): void

  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.failing {
  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.failing.only {
  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.failing.skip {
  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.only {
  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.only.failing {
  export function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.only.skip {
  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.skip {
  export function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.skip.failing {
  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.skip.only {
  export function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}
