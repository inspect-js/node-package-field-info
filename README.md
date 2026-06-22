# node-package-field-info <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Shared core for [`node-exports-info`](https://www.npmjs.com/package/node-exports-info) and [`node-imports-info`](https://www.npmjs.com/package/node-imports-info): maps node version ranges to feature categories and looks up per-category flags.

Each of those packages is essentially data — a `ranges` map of node semver range → category, plus per-flag tables of which categories support which feature. This package provides the (otherwise duplicated) logic that operates on that data, as factory functions: pass in the data, get back the accessor.

## Entry points
Each entry point is a factory: call it with a package's data, and it returns the corresponding accessor function.

 - `node-package-field-info/makeGetCategory`: `(ranges) => (nodeVersion?) => category`. Returns the latest category matching the version (defaulting to the current node version); throws if none match.
 - `node-package-field-info/makeGetCategoriesForRange`: `(ranges) => (range) => category[]`. Returns the categories whose range overlaps the given range.
 - `node-package-field-info/makeGetRange`: `(ranges) => (category) => range`. Returns the range for a category; throws for an unknown category.
 - `node-package-field-info/makeGetRangePairs`: `(ranges) => () => [range, category][]`. Returns the range/category pairs.
 - `node-package-field-info/makeIsCategory`: `(ranges) => (category) => boolean`. Returns whether a value is a known category.
 - `node-package-field-info/makeGetCategoryFlags`: `(isCategory, flagTables) => (category) => flags`. Returns an object of boolean flags (one per key in `flagTables`); throws for an unknown category.
 - `node-package-field-info/makeGetConditionsForCategory`: `(isCategory, conditionTables) => (category, moduleSystem?) => conditions`. Returns the array of supported conditions (or `null`) for a category, optionally narrowed to `'require'`/`'import'`; throws for an unknown category. `conditionTables` is `{ addonsCategories, moduleSyncCategories, nullCategories, defaultOnlyCategories }`.
 - `node-package-field-info/makeGetCategoryInfo`: `(getConditionsForCategory, getCategoryFlags) => (category, moduleSystem?) => { conditions, flags }`. Combines the two into one lookup.

The `ranges` object maps a node semver version range to a category, ordered most-recent first:
```js
{
	__proto__: null,
	'>= 3': 'c',
	'2.x': 'b',
	'< 2': 'a',
}
```
The `flagTables` object maps a flag name to the set of categories that support it:
```js
{
	foo: { __proto__: null, b: true, c: true },
	bar: { __proto__: null, c: true },
}
```

## Example
```js
var makeGetCategory = require('node-package-field-info/makeGetCategory');

var ranges = { __proto__: null, '>= 3': 'c', '2.x': 'b', '< 2': 'a' };
var getCategory = makeGetCategory(ranges);

getCategory('2.5.0'); // 'b'
```

## Related packages
 - [`node-exports-info`](https://www.npmjs.com/package/node-exports-info): info about node `exports` field support
 - [`node-imports-info`](https://www.npmjs.com/package/node-imports-info): info about node `imports` field support

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/node-package-field-info
[npm-version-svg]: https://versionbadg.es/inspect-js/node-package-field-info.svg
[deps-svg]: https://david-dm.org/inspect-js/node-package-field-info.svg
[deps-url]: https://david-dm.org/inspect-js/node-package-field-info
[dev-deps-svg]: https://david-dm.org/inspect-js/node-package-field-info/dev-status.svg
[dev-deps-url]: https://david-dm.org/inspect-js/node-package-field-info#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/node-package-field-info.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/node-package-field-info.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/node-package-field-info.svg
[downloads-url]: https://npm-stat.com/charts.html?package=node-package-field-info
[codecov-image]: https://codecov.io/gh/inspect-js/node-package-field-info/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/inspect-js/node-package-field-info/
[actions-image]: https://img.shields.io/github/check-runs/inspect-js/node-package-field-info/main
[actions-url]: https://github.com/inspect-js/node-package-field-info/actions
