import { join } from 'path';
import test, {ContextualTestContext, ContextualTest} from 'ava';

export interface FixtureTest {
  (name: string, fixtureName: string, cb: (t: ContextualTestContext, path: string) => any): ContextualTestContext;
  only(name: string, fixtureName: string, cb: (t: ContextualTestContext, path: string) => any): ContextualTestContext;
  skip(name: string, fixtureName: string, cb: (t: ContextualTestContext, path: string) => any): ContextualTestContext;
}

export default function fixture(path: string): FixtureTest {
  function curry(testfn: (name: string, cb: ContextualTest) => any): any {
    return (
      title: string,
      fixtureName: string,
      cb: (t: ContextualTestContext, path: string) => any
    ) => {
      const fixturePath = join(path, fixtureName);
      return testfn(`${title} (fixture: ${fixtureName})`, t => {
        return cb(t, fixturePath);
      });
    };
  }
  let result: any = curry(test);
  result.only = curry(test.only);
  result.skip = curry(test.skip);
  return result as FixtureTest;
}
