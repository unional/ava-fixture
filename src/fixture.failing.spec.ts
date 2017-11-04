import { join } from 'path'
import ava from 'ava'
import { getLogger } from 'aurelia-logging'

import fixture from './index'

const logger = getLogger('fixture.failing.spec')
logger.debug(`starting ${logger.id}`)

const ftest = fixture(ava, join(process.env['PWD']!, 'fixtures/cases'))

ftest.failing('failing promise test with title', () => {
  return Promise.reject('to fail test')
})

ftest.failing('failing test with title', t => {
  return t.fail('to fail test')
})
