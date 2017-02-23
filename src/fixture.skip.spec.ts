import ava from 'ava'

import fixture from './index'

const ftest = fixture(ava, 'fixtures/cases')

// ava.before(() => {
//   throw new Error('should not run before')
// })

ava.beforeEach(() => {
  throw new Error('should not run beforeEach')
})

// ava.after(() => {
//   throw new Error('should not run after')
// })

ava.afterEach(() => {
  throw new Error('should not run after each')
})

ava.skip('skip test', _t => {
  throw new Error('should not run ava skip')
})

ftest.skip('case-1', _t => {
  throw new Error('should not run ftest.skip')
})

ftest.skip.each(_t => {
  throw new Error('should not run')
})

ftest.skip.each.failing(_t => {
  throw new Error('should not run')
})
