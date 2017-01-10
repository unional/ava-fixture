import {
  ContextualTestContext,
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
export declare function fixtureTest(title: string, caseName: string, run: FixtureContextualTest): void;

/**
 * Runs a fixture test.
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 */
export declare function fixtureTest(caseName: string, run: FixtureContextualTest): void;

export namespace fixtureTest {
  export declare function todo(title: string): void

  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.failing {
  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.failing.only {
  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.failing.skip {
  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.only {
  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.only.failing {
  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.only.skip {
  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.skip {
  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.skip.failing {
  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.skip.only {
  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
}

/**
 * Runs a fixture test.
 * @param title Title of the test (for display and filtering).
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 * In this function, `cwd` is the fixture case folder.
 */
export declare function baselineTest(title: string, caseName: string, run: FixtureContextualBaselineTest): void;

/**
 * Runs a fixture test.
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 */
export declare function baselineTest(caseName: string, run: FixtureContextualBaselineTest): void;

export namespace baselineTest {
  export declare function todo(title: string): void

  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.failing {
  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.failing.only {
  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.failing.skip {
  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.only {
  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.only.failing {
  export declare function skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.only.skip {
  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.skip {
  export declare function failing(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function failing(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.skip.failing {
  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.skip.only {
  export declare function only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  export declare function only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
}
