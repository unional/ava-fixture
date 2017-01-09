import test, {
  Test,
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
  match(): Promise<void>
}

export type FixtureContextualBaselineTest = (t: ContextualTestContext, d: ContextualBaselineDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

export type FixtureContextualBaselineSerialTest = (t: ContextualTestContext, d: ContextualBaselineDiffContext) => void

export type FixtureContextualBaselineCallbackTest = (t: ContextualCallbackTestContext, d: ContextualBaselineDiffContext) => void

/**
 * The fixture text context (the callback function).
 */
export type FixtureContextualTest = (t: ContextualTestContext, d: ContextualDiffContext) => PromiseLike<any> | Iterator<any> | Observable | void

export type FixtureContextualSerialTest = (t: ContextualTestContext, d: ContextualDiffContext) => void

export type FixtureContextualCallbackTest = (t: ContextualCallbackTestContext, d: ContextualDiffContext) => void

export interface BeforeRunner {
  (title: string, run: Test): void
  (run: Test): void
  skip: FixtureRunner
  cb: FixtureCallbackRunner
}

export interface AfterRunner extends BeforeRunner {
  always: BeforeRunner
}

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

export interface FixtureContextualBaselineSerialTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (title: string, caseName: string, run: FixtureContextualBaselineSerialTest): void
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualBaselineSerialTest): void
}

export interface FixtureContextualSerialTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (title: string, caseName: string, run: FixtureContextualSerialTest): void
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualSerialTest): void
}

export interface FixtureContextualBaselineCallbackTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (title: string, caseName: string, run: FixtureContextualBaselineCallbackTest): void
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualBaselineCallbackTest): void
}

export interface FixtureContextualCallbackTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (title: string, caseName: string, run: FixtureContextualCallbackTest): void
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualCallbackTest): void
}

export interface FixtureRunner extends FixtureContextualTestFunction {
  skip: FixtureRunner
  cb: FixtureCallbackRunner
}

export interface FixtureCallbackRunner extends FixtureContextualTestFunction {
  cb: FixtureCallbackRunner
}

export interface FixtureOptions {
  /**
   * Path to the fixture's cases root folder.
   */
  casesPath: string,
  /**
   * Path to the fixture's baselines root folder.
   */
  baselinesPath: string,
  /**
   * Path to the fixture's results root folder.
   */
  resultsPath: string
}

export interface FixtureBaselineTest extends FixtureContextualBaselineTestFunction {
  // before, after, beforeEach, afterEach, skip, only
  before: BeforeRunner

  serial: FixtureContextualBaselineSerialTestFunction

  failing: FixtureContextualBaselineCallbackTestFunction

  cb: FixtureContextualBaselineCallbackTestFunction

  todo(title: string): void

  only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  only(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void
  skip(caseName: string, run: (t: ContextualTestContext, d: ContextualBaselineDiffContext) => any): void

  after(title: string, run: (t: ContextualTestContext) => void): void
  after(run: (t: ContextualTestContext) => void): void

  beforeEach(title: string, run: (t: ContextualTestContext) => void): void
  beforeEach(run: (t: ContextualTestContext) => void): void

  afterEach(title: string, run: (t: ContextualTestContext) => void): void
  afterEach(run: (t: ContextualTestContext) => void): void
}

export interface FixtureTest extends FixtureContextualTestFunction {

  // before, after, beforeEach, afterEach, skip, only
  before: BeforeRunner

  serial: FixtureContextualSerialTestFunction

  failing: FixtureContextualCallbackTestFunction

  cb: FixtureContextualCallbackTestFunction

  todo(title: string): void

  only(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  only(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  skip(title: string, caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void
  skip(caseName: string, run: (t: ContextualTestContext, d: ContextualDiffContext) => any): void

  after(title: string, run: (t: ContextualTestContext) => void): void
  after(run: (t: ContextualTestContext) => void): void

  beforeEach(title: string, run: (t: ContextualTestContext) => void): void
  beforeEach(run: (t: ContextualTestContext) => void): void

  afterEach(title: string, run: (t: ContextualTestContext) => void): void
  afterEach(run: (t: ContextualTestContext) => void): void
}
