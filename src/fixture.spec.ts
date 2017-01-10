import { join } from 'path'
import { existsSync } from 'fs'
import ava from 'ava'
import bluebird = require('bluebird')
import { getLogger } from 'aurelia-logging'

import fixture from './index'

const logger = getLogger('fixture:spec')
logger.debug('starting fixture.spec')

const ftest = fixture(ava, join(process.env.PWD, 'fixtures/cases'))

ava('shape test', t => {
  t.truthy(ftest.only)
  t.truthy(ftest.failing)
  t.truthy(ftest.skip)
  // t.truthy(ftest.failing.only)
  // t.truthy(ftest.failing.skip)
  // t.truthy(ftest.only.failing)
  // t.truthy(ftest.skip.failing)
})

ftest('abs path', 'case-1', (t, d) => {
  const localCwd = process.cwd()
  logger.debug('abs path, case-1')
  logger.debug(`outer cwd: ${cwd}`)
  logger.debug(`local cwd: ${localCwd}`)
  const filePath = join(d.casePath, 'somefile.txt')
  t.true(existsSync(filePath), 'should find somefile.txt')
  t.is(localCwd, d.casePath, 'local cwd is the cases path')
  // make sure it works for custom promise libraries.
  return bluebird.resolve()
})

const rtest = fixture(ava, './fixtures/cases')

rtest('relative path', 'case-1', (t, d) => {
  const filePath = join(d.casePath, 'somefile.txt')
  t.true(existsSync(filePath), 'should find somefile.txt')
  t.is(process.cwd(), d.casePath, 'cwd set to case path.')
})

ftest('case-1', (t, d) => {
  t.pass('work without title.')
  t.is(process.cwd(), d.casePath, 'cwd set to case path.')
})

// `test.only` test needs to be commented out so other tests can run. :)
// ftest.only('only test', 'case-1', t => {
//   t.pass('only works')
// })

// ftest.only('case-1', t => {
//   t.pass('only without title works.')
// })

ftest.skip('skip test', 'case-1', t => {
  t.pass('skip test works.')
})

ftest.skip('case-1', t => {
  t.pass('skip without title works.')
})

// this is used by last test.
const cwd = process.cwd()

ava(t => {
  t.is(process.cwd(), cwd, 'normal ava test still under normal cwd.')
})