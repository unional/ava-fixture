import ava from 'ava'

import fixture from './index'

const ftest = fixture(ava, 'fixtures/cases')

ava.before(() => {
  throw new Error('should not run')
})

ava.beforeEach(() => {
  throw new Error('should not run')
})

ava.after(() => {
  throw new Error('should not run')
})

ava.afterEach(() => {
  throw new Error('should not run')
})

ava.skip('skip test', 'case-1', _t => {
  throw new Error('should not run')
})

ftest.skip('case-1', _t => {
  throw new Error('should not run')
})

ftest.only.skip('skip test', 'case-1', _t => {
  throw new Error('should not run')
})

ftest.only.skip('case-1', _t => {
  throw new Error('should not run')
})

ftest.skip.only('skip test', 'case-1', _t => {
  throw new Error('should not run')
})

ftest.skip.only('case-1', _t => {
  throw new Error('should not run')
})

ftest.skip.each(_t => {
  throw new Error('should not run')
})

ftest.skip.each.failing(_t => {
  throw new Error('should not run')
})
