import { join } from 'path';
import test, { ContextualTestContext, ContextualTest, Observable } from 'ava';

export interface FixtureTest {
  (name: string, fixtureName: string, run: (t: ContextualTestContext, path: string) => Promise<void> | Iterator<any> | Observable | void): void;
  (fixtureName: string, run: (t: ContextualTestContext, path: string) => Promise<void> | Iterator<any> | Observable | void): void;

  only(name: string, fixtureName: string, run: (t: ContextualTestContext, path: string) => any): void;
  only(fixtureName: string, run: (t: ContextualTestContext, path: string) => any): void;

  skip(name: string, fixtureName: string, run: (t: ContextualTestContext, path: string) => any): void;
  skip(fixtureName: string, run: (t: ContextualTestContext, path: string) => any): void;

  serial(name: string, fixtureName: string, run: (t: ContextualTestContext, path: string) => void): void;
  serial(fixtureName: string, run: (t: ContextualTestContext, path: string) => void): void;
}

export default function fixture(path: string): FixtureTest {
  function curry(testfn: (name: string, run: ContextualTest) => any): any {
    return (
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
      return testfn(`${name ? name + ' ' : ''}(fixture: ${fixtureName})`, t => {
        return run(t, fixturePath);
      });
    };
  }
  let result: any = curry(test);
  result.only = curry(test.only);
  result.skip = curry(test.skip);
  result.serial = curry(test.serial);
  return result as FixtureTest;
}
