import { join } from 'path';
import { existsSync } from 'fs';
import ava from 'ava';

import fixture from './index';

const ftest = fixture(ava, join(process.env.PWD, 'src/fixtures'));

ftest('abs path', 'case-1', (t, path) => {
  const filePath = join(path, 'somefile.txt');
  t.plan(1);
  t.true(existsSync(filePath), 'should find somefile.txt');
});

const rtest = fixture(ava, '../src/fixtures');

rtest('relative path', 'case-1', (t, path) => {
  const filePath = join(path, 'somefile.txt');
  t.plan(1);
  t.true(existsSync(filePath), 'should find somefile.txt');
});

ftest('case-1', t => {
  t.pass('work without title.');
});

// `test.only` test needs to be commented out so other tests can run. :)
// test.only('only test', 'case-1', t => {
//   t.pass('only works');
// });

// test.only('case-1', t => {
//   t.pass('only without title works.');
// });

ftest.skip('skip test', 'case-1', t => {
  t.pass('skip test works.');
});

ftest.skip('case-1', t => {
  t.pass('skip without title works.');
});

ftest.serial('serial', 'case-1', t => {
  t.pass('serial works.');
});

ftest.serial('case-1', t => {
  t.pass('serial without title works.');
});

ftest.todo('todo test');

ftest.cb('cb', 'case-1', t => {
  t.pass('cb works.');
  t.end();
});

ftest.cb('case-1', t => {
  t.pass('cb without title works.');
  t.end();
});
