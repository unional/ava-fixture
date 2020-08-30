import {
  TestContext,
  Context,
  Observable
} from 'ava'

export interface ContextualDiffContext {
  /**
   * Name of the current running case.
   */
  caseName: string,
  /**
   * Path of the case folder
   */
  casePath: string
}

export interface ContextualBaselineDiffContext extends ContextualDiffContext {
  /**
   * Path of the case's baseline folder
   */
  baselinePath: string,

  /**
   * Path of the case's result folder
   */
  resultPath: string,

  /**
   * Check if the baseline folder and the result folder matches.
   * If not, error will be thrown.
   */
  match(): Promise<any>
}

export interface ContextualBaselineEachDiffContext extends ContextualBaselineDiffContext, ContextualDiffContext {
}

/**
 * The fixture text context (the callback function).
 */
export type FixtureContextualTest<T = any> = (t: TestContext & Context<T>, d: ContextualDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

export type FixtureContextualBaselineTest<T = any> = (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

export type FixtureContextualEachTest<T = any> = (t: TestContext & Context<T>, d: ContextualDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

export type FixtureContextualBaselineEachTest<T = any> = (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

/**
 * Runs a fixture test.
 * @param title Title of the test (for display and filtering).
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 * In this function, `cwd` is the fixture case folder.
 */
export declare function fixtureTest<T = any>(title: string, caseName: string, run: FixtureContextualTest<T>): void;

/**
 * Runs a fixture test.
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 */
export declare function fixtureTest<T = any>(caseName: string, run: FixtureContextualTest<T>): void;

export namespace fixtureTest {
  export declare function todo(title: string): void

  export declare function failing<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function failing<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void

  export declare function only<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function only<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void

  export declare function skip<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function skip<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void

  export declare function each<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function each<T = any>(run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.failing {
  export declare function only<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function only<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void

  export declare function skip<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function skip<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.only {
  export declare function failing<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function failing<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void

  export declare function each<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function each<T = any>(run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.only.each {
  export declare function failing<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
  export declare function failing<T = any>(run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
}

export namespace fixtureTest.skip {
  export declare function failing<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function failing<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void

  export declare function each<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function each<T = any>(run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
}

export namespace fixtureTest.skip.each {
  export declare function failing<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
  export declare function failing<T = any>(run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
}

export namespace fixtureTest.each {
  export declare function failing<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
  export declare function failing<T = any>(run: (t: TestContext & Context<T>, d: ContextualDiffContext) => any): void
}

/**
 * Runs a fixture test.
 * @param title Title of the test (for display and filtering).
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 * In this function, `cwd` is the fixture case folder.
 */
export declare function baselineTest<T = any>(title: string, caseName: string, run: FixtureContextualBaselineTest<T>): void;

/**
 * Runs a fixture test.
 * @param caseName Name of the test case, matching the folder under `path`.
 * @param run The test function.
 */
export declare function baselineTest<T = any>(caseName: string, run: FixtureContextualBaselineTest<T>): void;

export namespace baselineTest {
  export declare function todo(title: string): void

  export declare function failing<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void
  export declare function failing<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void

  export declare function only<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void
  export declare function only<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void

  export declare function skip<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void
  export declare function skip<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void

  export declare function each<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
  export declare function each<T = any>(run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
}

export namespace baselineTest.failing {
  export declare function only<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void
  export declare function only<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void

  export declare function skip<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void
  export declare function skip<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void
}

export namespace baselineTest.only {
  export declare function failing<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void
  export declare function failing<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void

  export declare function each<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
  export declare function each<T = any>(run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
}

export namespace baselineTest.only.each {
  export declare function failing<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
  export declare function failing<T = any>(run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
}

export namespace baselineTest.skip {
  export declare function failing<T = any>(title: string, caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void
  export declare function failing<T = any>(caseName: string, run: (t: TestContext & Context<T>, d: ContextualBaselineDiffContext) => any): void

  export declare function each<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
  export declare function each<T = any>(run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
}

export namespace baselineTest.skip.each {
  export declare function failing<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
  export declare function failing<T = any>(run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
}

export namespace baselineTest.each {
  export declare function failing<T = any>(filter: string | RegExp, run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
  export declare function failing<T = any>(run: (t: TestContext & Context<T>, d: ContextualBaselineEachDiffContext) => any): void
}
