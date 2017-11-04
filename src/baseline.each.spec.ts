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
order.move(0)
ctest.each((t, d) => {
  log.info('each', d.caseName)
  log.info('each', d.baselinePath)
  log.info('each', d.resultPath)
  t.is(typeof d.match, 'function')

  order.once(dirs.length - dirsCopy.length)
  const expected = dirsCopy.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
})

const dirsCopy2 = [...dirs]
const order2 = new Order(dirs.length - 1)
order2.move(0)
ctest.each(/.*pass$/, (t, d) => {
  log.info('each filter', d.caseName, d.casePath)
  order2.once(dirs.length - dirsCopy2.length)
  const index = dirsCopy2.indexOf(d.caseName)
  t.not(index, -1)
  dirsCopy2.splice(index, 1)

  t.is(d.casePath, join(parent, d.caseName))
})

const dirsCopy6 = [...dirs]
const order6 = new Order(dirs.length - 1)
order6.move(0)
ctest.each('.*pass$', (t, d) => {
  log.info('each filter string', d.caseName, d.casePath)
  order6.once(dirs.length - dirsCopy6.length)
  const index = dirsCopy6.indexOf(d.caseName)
  t.not(index, -1)
  dirsCopy6.splice(index, 1)

  t.is(d.casePath, join(parent, d.caseName))
})

const dirsCopy3 = [...dirs]
const order3 = new Order(dirs.length)
order3.move(0)
ctest.each.failing((t, d) => {
  log.info('each failing', d.caseName, d.casePath)
  order3.once(dirs.length - dirsCopy3.length)
  const expected = dirsCopy3.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  t.fail('fail')
})

const dirsCopy4 = [...dirs]
const order4 = new Order(dirs.length - 1)
order4.move(0)
ctest.each.failing(/.*pass$/, (t, d) => {
  log.info('each failing filter', d.caseName, d.casePath)
  order4.once(dirs.length - dirsCopy4.length)
  const expected = dirsCopy4.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  t.fail('failing')
  // return order4.end(1).then(() => Promise.reject('no'))
})

ctest.skip.each('.*pass$', (t, d) => {
  // d is typed
  t.not(d.baselinePath, undefined);
  t.fail('skip.each should not execute')
})

ctest.skip.each.failing('.*pass$', (t, d) => {
  // d is typed
  t.not(d.baselinePath, undefined);
  t.fail('skip.each.faililng should not execute')
})

const dirsCopy11 = [...dirs]
const order11 = new Order(dirs.length)
order11.move(0)
ctest.each(async (t, d) => {
  log.info('each+async', d.caseName, d.casePath)
  order11.once(dirs.length - dirsCopy11.length)
  const expected = dirsCopy11.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  await Promise.resolve()
})

const dirsCopy12 = [...dirs]
const order12 = new Order(dirs.length)
order12.move(0)
ctest.each.failing(async (t, d) => {
  log.info('each+async', d.caseName, d.casePath)
  order12.once(dirs.length - dirsCopy12.length)
  const expected = dirsCopy12.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  await Promise.reject('to fail test')
})

// const dirsCopy7 = [...dirs]
// const order7 = new Order(dirs.length - 1)
// ctest.only.each.failing('.*pass$', (t, d) => {
//   log.info('each failing filter string', d.caseName, d.casePath)
//   order7.step(dirs.length - dirsCopy7.length)
//   const expected = dirsCopy7.shift()
//   t.is(d.caseName, expected)
//   t.is(d.casePath, join(parent, d.caseName))
//   return order7.end(1).then(() => Promise.reject('no'))
// })
