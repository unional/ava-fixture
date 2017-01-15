import { getLogger } from 'aurelia-logging'
import ava from 'ava'
import { resolve, join } from 'path'

import fixture from './index'

const log = getLogger('fixture.each.file.spec')
log.debug('starting fixture.each.file.spec')

const ftest = fixture(ava, 'fixtures/file-cases')
const casesPath = resolve(process.cwd(), 'fixtures/file-cases')
const files = ['file1.txt', 'file2.txt']
ftest.each((t, d) => {
  t.true(files.indexOf(d.caseName) >= 0)
  t.is(d.casePath, join(casesPath, d.caseName))
})
