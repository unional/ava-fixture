# ava fixture

[![npm version](https://badge.fury.io/js/ava-fixture.svg)](https://badge.fury.io/js/ava-fixture)
[![Build Status](https://travis-ci.org/unional/ava-fixture.svg?branch=master)](https://travis-ci.org/unional/ava-fixture)

Helps you to easily write fixture tests with [`ava`](https://github.com/avajs/ava).

## What is Fixture Test

Fixture tests are tests that require access to some files. The tests may write files and in that case the files can be compared with a baseline (i.e. Baseline Tests)

## Usage

```ts
import ava from 'ava';
import fixture from 'ava-fixture';

// Point to the base folder which contain the fixtures.
const ftest = fixture(ava, '../fixture/cases');

// You can also use absolute path.
// const ftest = fixture(ava, join(process.env.PWD, 'fixture/cases'));

ftest('test title', 'fixture-name', (t, path) => {
  // t is ava test.
  // path is the path to the fixture-name folder.
  // ...test away
});
```

## API

typings is available so just follow the code completion.

### `fixture(ava: Ava.Test, absOrRelativePath: string): FixtureTest`

### `fixtureTest([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.serial([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.cb([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.only([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.skip([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.todo([title: string], caseName: string): void`

### `fixtureTest.failing([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.before([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.after([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.beforeEach([title], caseName, (t, casePath) => Promise<any> | void): void`

### `fixtureTest.afterEach([title], caseName, (t, casePath) => Promise<any> | void): void`

## Contribute

```sh
# right after fork
npm install

# begin making changes
npm run watch
```
