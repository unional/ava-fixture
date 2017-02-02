import { join } from 'path'
import { existsSync } from 'fs'
import ava from 'ava'
import bluebird = require('bluebird')
import { getLogger } from 'aurelia-logging'

import fixture from './index'

const logger = getLogger('fixture.spec')
logger.debug('starting fixture.spec')

const ftest = fixture(ava, join(process.env.PWD, 'fixtures/cases'))

ava('shape test', t => {
  t.truthy(ftest.failing)
  t.truthy(ftest.failing.only)
  t.truthy(ftest.failing.only.skip)
  t.truthy(ftest.failing.skip)
  t.truthy(ftest.failing.skip.only)
  t.truthy(ftest.only)
  t.truthy(ftest.only.failing)
  t.truthy(ftest.only.failing.skip)
  t.truthy(ftest.only.skip)
  t.truthy(ftest.only.skip.failing)
  t.truthy(ftest.skip)
  t.truthy(ftest.skip.failing)
  t.truthy(ftest.skip.failing.only)
  t.truthy(ftest.skip.only)
  t.truthy(ftest.skip.only.failing)
})

ftest('abs path', 'case-1', (t, d) => {
  const localCwd = process.cwd()
  logger.debug('abs path, case-1')
  logger.debug(`outer cwd: ${cwd}`)
  logger.debug(`local cwd: ${localCwd}`)

  t.is(d.caseName, 'case-1')

  // keep cwd since 0.8.0
  t.is(localCwd, cwd)
  process.chdir(d.casePath)
  t.true(existsSync('somefile.txt'), 'should find somefile.txt')

  // make sure it works for custom promise libraries.
  return bluebird.resolve()
})

const rtest = fixture(ava, './fixtures/cases')

rtest('relative path', 'case-1', (t, d) => {
  const localCwd = process.cwd()
  logger.debug('abs path, case-1')
  logger.debug(`outer cwd: ${cwd}`)
  logger.debug(`local cwd: ${localCwd}`)

  // keep cwd since 0.8.0
  t.is(localCwd, cwd)
  process.chdir(d.casePath)
  t.true(existsSync('somefile.txt'), 'should find somefile.txt')

  // make sure it works for custom promise libraries.
  return bluebird.resolve()
})

ftest('case-1', (t) => {
  t.pass('work without title.')
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
