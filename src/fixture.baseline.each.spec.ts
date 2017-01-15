import Order from 'assert-order'
import { getLogger } from 'aurelia-logging'
import ava from 'ava'
import { readdirSync } from 'fs'
import { resolve, join } from 'path'

import fixture from './index'

const log = getLogger('fixture.baseline.each.spec')
log.debug('starting fixture.baseline.each.spec')

ava('baseline and result must be specified together', t => {
  t.throws(() => (fixture as any)(ava, 'x', 'y'))
})

const ctest = fixture(ava, 'fixtures/cases', 'fixtures/baselines', 'fixtures/results')

ava('shape', t => {
  t.not(ctest.each, undefined)
  t.not(ctest.each.failing, undefined)
  t.not(ctest.only.each, undefined)
  t.not(ctest.only.each.failing, undefined)
  t.not(ctest.skip.each, undefined)
  t.not(ctest.skip.each.failing, undefined)
})

const parent = resolve(process.cwd(), 'fixtures/cases')
const dirs = readdirSync(parent).toString().split(',')

const dirsCopy = [...dirs]
const order = new Order(dirs.length)
ctest.each((t, d) => {
  log.info('each', d.caseName)
  log.info('each', d.baselinePath)
  log.info('each', d.resultPath)
  t.is(typeof d.match, 'function')

  order.step(dirs.length - dirsCopy.length)
  const expected = dirsCopy.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order.end(100)
})

const dirsCopy2 = [...dirs]
const order2 = new Order(dirs.length - 1)
ctest.each(/.*pass$/, (t, d) => {
  log.info('each filter', d.caseName, d.casePath)
  order2.step(dirs.length - dirsCopy2.length)
  const index = dirsCopy2.indexOf(d.caseName)
  t.not(index, -1)
  dirsCopy2.splice(index, 1)

  t.is(d.casePath, join(parent, d.caseName))
  return order2.end(100)
})

const dirsCopy6 = [...dirs]
const order6 = new Order(dirs.length - 1)
ctest.each('.*pass$', (t, d) => {
  log.info('each filter string', d.caseName, d.casePath)
  order6.step(dirs.length - dirsCopy6.length)
  const index = dirsCopy6.indexOf(d.caseName)
  t.not(index, -1)
  dirsCopy6.splice(index, 1)

  t.is(d.casePath, join(parent, d.caseName))
  return order6.end(100)
})

const dirsCopy3 = [...dirs]
const order3 = new Order(dirs.length)
ctest.each.failing((t, d) => {
  log.info('each failing', d.caseName, d.casePath)
  order3.step(dirs.length - dirsCopy3.length)
  const expected = dirsCopy3.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order3.end(100).then(() => Promise.reject('no'))
})

const dirsCopy4 = [...dirs]
const order4 = new Order(dirs.length - 1)
ctest.each.failing(/.*pass$/, (t, d) => {
  log.info('each failing filter', d.caseName, d.casePath)
  order4.step(dirs.length - dirsCopy4.length)
  const expected = dirsCopy4.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order4.end(100).then(() => Promise.reject('no'))
})

// const dirsCopy5 = [...dirs]
// const order5 = new Order(dirs.length - 1)
// ctest.each.failing('.*pass$', (t, d) => {
//   log.info('each failing filter string', d.caseName, d.casePath)
//   order5.step(dirs.length - dirsCopy5.length)
//   const expected = dirsCopy5.shift()
//   t.is(d.caseName, expected)
//   t.is(d.casePath, join(parent, d.caseName))
//   return order5.end(100).then(() => Promise.reject('no'))
// })

const dirsCopy7 = [...dirs]
const order7 = new Order(dirs.length - 1)
ctest.only.each.failing('.*pass$', (t, d) => {
  log.info('each failing filter string', d.caseName, d.casePath)
  order7.step(dirs.length - dirsCopy7.length)
  const expected = dirsCopy7.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order7.end(100).then(() => Promise.reject('no'))
})
