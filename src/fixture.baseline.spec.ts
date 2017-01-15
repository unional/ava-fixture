import ava from 'ava'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import * as mkdirp from 'mkdirp'
import { getLogger } from 'aurelia-logging'
import fixture from './index'

const log = getLogger('fixture:baseline:spec')
log.debug('starting fixture.baseline.spec')

ava('baseline and result must be specified together', t => {
  t.throws(() => (fixture as any)(ava, 'x', 'y'))
})

const btest = fixture(ava, 'fixtures/cases', 'fixtures/baselines', 'fixtures/results')

btest.failing('case-1', (_t, d) => {
  // no api to ease read file as the actual test target should be doing it.
  const file = readFileSync(resolve(d.casePath, 'somefile.txt')).toString()

  // no api to ease write file for the same reason
  mkdirp.sync(d.resultPath)
  writeFileSync(resolve(d.resultPath, 'somefile.txt'), file)

  return d.match()
})

btest('case-pass', (_t, d) => {
  // no api to ease read file as the actual test target should be doing it.
  const file = readFileSync(resolve(d.casePath, 'lorem-lpsum.txt')).toString()

  // no api to ease write file for the same reason
  mkdirp.sync(d.resultPath)
  writeFileSync(resolve(d.resultPath, 'lorem-lpsum.txt'), file)

  return d.match()
})
