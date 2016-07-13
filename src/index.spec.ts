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
