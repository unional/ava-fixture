import test, {
  Test,
  ContextualTestContext,
  ContextualCallbackTestContext,
  Observable,
} from 'ava';

export type FixtureContextualTest = (t: ContextualTestContext, absolutePath: string, relativePath: string) => PromiseLike<any> | Iterator<any> | Observable | void;

export type FixtureContextualSerialTest = (t: ContextualTestContext, absolutePath: string, relativePath: string) => void;

export type FixtureContextualCallbackTest = (t: ContextualCallbackTestContext, absolutePath: string, relativePath: string) => void;

export interface BeforeRunner {
  (title: string, run: Test): void;
  (run: Test): void;
  skip: FixtureRunner;
  cb: FixtureCallbackRunner;
}

export interface AfterRunner extends BeforeRunner {
  always: BeforeRunner;
}

export interface FixtureContextualTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (title: string, caseName: string, run: FixtureContextualTest): void;
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualTest): void;
}

export interface FixtureContextualSerialTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (title: string, caseName: string, run: FixtureContextualSerialTest): void;
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualSerialTest): void;
}

export interface FixtureContextualCallbackTestFunction {
  /**
   * Runs a fixture test.
   * @param title Title of the test (for display and filtering).
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (title: string, caseName: string, run: FixtureContextualCallbackTest): void;
  /**
   * Runs a fixture test.
   * @param caseName Name of the test case, matching the folder under `path`.
   * @param run The test function.
   */
  (caseName: string, run: FixtureContextualCallbackTest): void;
}

export interface FixtureRunner extends FixtureContextualTestFunction {
  skip: FixtureRunner;
  cb: FixtureCallbackRunner;
}

export interface FixtureCallbackRunner extends FixtureContextualTestFunction {
  cb: FixtureCallbackRunner;
}

export interface FixtureTest extends FixtureContextualTestFunction {

  // before, after, beforeEach, afterEach, skip, only
  before: BeforeRunner;

  serial: FixtureContextualSerialTestFunction;

  failing: FixtureContextualCallbackTestFunction;

  cb: FixtureContextualCallbackTestFunction;

  todo(title: string): void;

  only(title: string, caseName: string, run: (t: ContextualTestContext, absolutePath: string, relativePath: string) => any): void;
  only(caseName: string, run: (t: ContextualTestContext, absolutePath: string, relativePath: string) => any): void;

  skip(title: string, caseName: string, run: (t: ContextualTestContext, absolutePath: string, relativePath: string) => any): void;
  skip(caseName: string, run: (t: ContextualTestContext, absolutePath: string, relativePath: string) => any): void;

  after(title: string, run: (t: ContextualTestContext) => void): void;
  after(run: (t: ContextualTestContext) => void): void;

  beforeEach(title: string, run: (t: ContextualTestContext) => void): void;
  beforeEach(run: (t: ContextualTestContext) => void): void;

  afterEach(title: string, run: (t: ContextualTestContext) => void): void;
  afterEach(run: (t: ContextualTestContext) => void): void;
}
