import Order from 'assert-order'
import { getLogger } from 'aurelia-logging'
import ava from 'ava'
import { readdirSync } from 'fs'
import { resolve, join } from 'path'

import fixture from './index'

const log = getLogger('fixture.each.spec')
log.debug('starting fixture.each.spec')

const parent = resolve(process.cwd(), 'fixtures/cases')
const dirs = readdirSync(parent).toString().split(',')
const ctest = fixture(ava, 'fixtures/cases')
log.debug('fixture.each.spec loaded dirs')

ava('baseline and result must be specified together', t => {
  t.throws(() => (fixture as any)(ava, 'x', 'y'))
})

ava('shape', t => {
  t.not(ctest.each, undefined)
  t.not(ctest.each.failing, undefined)
  t.not(ctest.only.each, undefined)
  t.not(ctest.only.each.failing, undefined)
  t.not(ctest.skip.each, undefined)
  t.not(ctest.skip.each.failing, undefined)
})

const dirsCopy = [...dirs]
const order = new Order(dirs.length)
ctest.each((t, d) => {
  log.info('each', d.caseName, d.casePath)
  order.step(dirs.length - dirsCopy.length)
  const expected = dirsCopy.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order.end(1)
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
  return order2.end(1)
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
  return order6.end(1)
})

const dirsCopy3 = [...dirs]
const order3 = new Order(dirs.length)
ctest.each.failing((t, d) => {
  log.info('each failing', d.caseName, d.casePath)
  order3.step(dirs.length - dirsCopy3.length)
  const expected = dirsCopy3.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order3.end(1).then(() => Promise.reject('no'))
})

const dirsCopy4 = [...dirs]
const order4 = new Order(dirs.length - 1)
ctest.each.failing(/.*pass$/, (t, d) => {
  log.info('each failing filter', d.caseName, d.casePath)
  order4.step(dirs.length - dirsCopy4.length)
  const expected = dirsCopy4.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order4.end(1).then(() => Promise.reject('no'))
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

const dirsCopy8 = [...dirs]
const order8 = new Order(dirs.length)
ctest.skip.each((t, d) => {
  log.info('skip each', d.caseName, d.casePath)
  order8.step(dirs.length - dirsCopy8.length)
  const expected = dirsCopy8.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order8.end(1).then(() => Promise.reject('no'))
})

const dirsCopy9 = [...dirs]
const order9 = new Order(dirs.length)
ctest.skip.each.failing((t, d) => {
  log.info('skip each failing', d.caseName, d.casePath)
  order9.step(dirs.length - dirsCopy9.length)
  const expected = dirsCopy9.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order9.end(1).then(() => Promise.reject('no'))
})

const dirsCopy10 = [...dirs]
const order10 = new Order(dirs.length)
ctest.each((t, d) => {
  log.info('skip each failing', d.caseName, d.casePath)
  order10.step(dirs.length - dirsCopy10.length)
  const expected = dirsCopy10.shift()
  t.is(d.caseName, expected)
  t.is(d.casePath, join(parent, d.caseName))
  return order10.end(1)
})
