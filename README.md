# ava-fixture

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

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
# right after clone
npm install

# begin making changes
git checkout -b <branch>
npm run watch

# edit `webpack.config.dev.js` to exclude dependencies for the global build.

# after making change(s)
git commit -m "<commit message>"
git push

# create PR
```

## Npm Commands

There are a few useful commands you can use during development.

```sh
# Run tests (and lint) automatically whenever you save a file.
npm run watch

# Run tests with coverage stats (but won't fail you if coverage does not meet criteria)
npm run test

# Manually verify the project.
# This will be ran during 'npm preversion' so you normally don't need to run this yourself.
npm run verify

# Build the project.
# You normally don't need to do this.
npm run build

# Run tslint
# You normally don't need to do this as `npm run watch` and `npm version` will automatically run lint for you.
npm run lint
```

Generated by [`generator-unional@0.3.1`](https://github.com/unional/unional-cli)

[npm-image]: https://img.shields.io/npm/v/ava-fixture.svg?style=flat
[npm-url]: https://npmjs.org/package/ava-fixture
[downloads-image]: https://img.shields.io/npm/dm/ava-fixture.svg?style=flat
[downloads-url]: https://npmjs.org/package/ava-fixture
[travis-image]: https://img.shields.io/travis/unional/ava-fixture.svg?style=flat
[travis-url]: https://travis-ci.org/unional/ava-fixture
[coveralls-image]: https://coveralls.io/repos/github/unional/ava-fixture/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/ava-fixture
