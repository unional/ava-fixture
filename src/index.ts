import { join } from 'path';
import {
  Test,
  ContextualTestContext,
  ContextualCallbackTestContext,
  Observable,
  Runner,
  ContextualRunner,
  ContextualCallbackTest,
  ContextualSerialTest,
  ContextualTest
} from 'ava';

export namespace Ava {
  export interface ContextualTestFunction {
    (name: string, run: ContextualTest): void;
    (run: ContextualTest): void;
  }

  export interface ContextualSerialTestFunction {
    (name: string, run: ContextualSerialTest): void;
    (run: ContextualSerialTest): void;
  }

  export interface ContextualCallbackTestFunction {
    (name: string, run: ContextualCallbackTest): void;
    (run: ContextualCallbackTest): void;
  }

  export interface Test extends ContextualTestFunction {
    before: Runner;
    after: Runner;
    beforeEach: ContextualRunner;
    afterEach: ContextualRunner;

    skip: ContextualTestFunction;
    only: ContextualTestFunction;

    serial: ContextualSerialTestFunction;
    failing: ContextualCallbackTestFunction;
    cb: ContextualCallbackTestFunction;
    todo(name: string): void;
  }
}

export type FixtureContextualTest = (t: ContextualTestContext, path: string) => PromiseLike<void> | Iterator<any> | Observable | void;

export type FixtureContextualSerialTest = (t: ContextualTestContext, path: string) => void;

export type FixtureContextualCallbackTest = (t: ContextualCallbackTestContext, path: string) => void;

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
  (title: string, fixtureName: string, run: FixtureContextualTest): void;
  (fixtureName: string, run: FixtureContextualTest): void;
}

export interface FixtureContextualSerialTestFunction {
  (title: string, fixtureName: string, run: FixtureContextualSerialTest): void;
  (fixtureName: string, run: FixtureContextualSerialTest): void;
}

export interface FixtureContextualCallbackTestFunction {
  (title: string, fixtureName: string, run: FixtureContextualCallbackTest): void;
  (fixtureName: string, run: FixtureContextualCallbackTest): void;
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

  only(title: string, fixtureName: string, run: (t: ContextualTestContext, path: string) => any): void;
  only(fixtureName: string, run: (t: ContextualTestContext, path: string) => any): void;

  skip(title: string, fixtureName: string, run: (t: ContextualTestContext, path: string) => any): void;
  skip(fixtureName: string, run: (t: ContextualTestContext, path: string) => any): void;

  after(title: string, run: (t: ContextualTestContext) => void): void;
  after(run: (t: ContextualTestContext) => void): void;

  beforeEach(title: string, run: (t: ContextualTestContext) => void): void;
  beforeEach(run: (t: ContextualTestContext) => void): void;

  afterEach(title: string, run: (t: ContextualTestContext) => void): void;
  afterEach(run: (t: ContextualTestContext) => void): void;
}

export default function fixture(ava: Ava.Test, path: string): FixtureTest {
  function curry<T>(testfn: (name: string, run: any) => any): T {
    return ((
      name: string,
      fixtureName: string,
      run: (t: ContextualTestContext, path: string) => any
    ) => {
      if (!run) {
        // name is optional
        run = fixtureName as any;
        fixtureName = name;
      }

      const fixturePath = join(path, fixtureName);
      return testfn(`${name ? name + ' ' : ''}(fixture: ${fixtureName})`, (t: any) => {
        return run(t, fixturePath);
      });
    }) as any;
  }

  let fn = curry<FixtureContextualTestFunction>(ava);

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
  };

  for (let key in others) {
    (fn as any)[key] = (others as any)[key];
  }

  return fn as FixtureTest; // fn as typeof fn & typeof others;
}
