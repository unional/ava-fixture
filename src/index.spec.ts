import test from 'ava'
import path = require('path')

import { fixture } from './index'

test('eachDirectory', t => {
  const names = ['case 4', 'case 5']
  fixture('cases').eachDirectory(dir => {
    const i = names.indexOf(dir.name)
    t.true(i >= 0)
    names.splice(i, 1)
    t.is(dir.path, path.resolve('cases/' + dir.name))
  })
  t.is(names.length, 0)
})
test('eachFile', t => {
  const filenames = ['case1.txt', 'case2.md', 'case3.js']
  fixture('cases').eachFile(file => {
    const i = filenames.indexOf(file.filename)
    t.true(i >= 0)
    filenames.splice(i, 1)
    t.is(file.name, file.filename.slice(0, file.filename.lastIndexOf('.')))
    t.is(file.path, path.resolve('cases/' + file.filename))
  })
  t.is(filenames.length, 0)
})
