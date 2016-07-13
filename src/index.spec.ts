import { join } from 'path';
import fixture from './index';
import { existsSync } from 'fs';

const test = fixture(join(process.env.PWD, 'src/fixtures'));

test('abs path', 'case-1', (t, path) => {
  const filePath = join(path, 'somefile.txt');
  t.plan(1);
  t.true(existsSync(filePath), 'should find somefile.txt');
});

const rtest = fixture('../src/fixtures');

rtest('relative path', 'case-1', (t, path) => {
  const filePath = join(path, 'somefile.txt');
  t.plan(1);
  t.true(existsSync(filePath), 'should find somefile.txt');
});

test('case-1', t => {
  t.pass('work without title.');
});

// `test.only` test needs to be commented out so other tests can run. :)
// test.only('only test', 'case-1', t => {
//   t.pass('only works');
// });

// test.only('case-1', t => {
//   t.pass('only without title works.');
// });

test.skip('skip test', 'case-1', t => {
  t.pass('skip test works.');
});

test.skip('case-1', t => {
  t.pass('skip without title works.');
});

test.serial('serial', 'case-1', t => {
  t.pass('serial works.');
});

test.serial('case-1', t => {
  t.pass('serial without title works.');
});
