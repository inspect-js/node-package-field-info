'use strict';

var test = require('tape');

var makeGetCategoryFlags = require('../makeGetCategoryFlags');
var makeIsCategory = require('../makeIsCategory');

var fixtures = require('./fixtures');

test('makeGetCategoryFlags', function (t) {
	var isCategory = makeIsCategory(fixtures.ranges);
	var getCategoryFlags = makeGetCategoryFlags(isCategory, fixtures.flagTables);

	t.equal(typeof getCategoryFlags, 'function', 'returns a function');

	t.deepEqual(getCategoryFlags('a'), { foo: false, bar: false }, 'category `a` has no flags');
	t.deepEqual(getCategoryFlags('b'), { foo: true, bar: false }, 'category `b` has `foo` only');
	t.deepEqual(getCategoryFlags('c'), { foo: true, bar: false }, 'category `c` has `foo` only');
	t.deepEqual(getCategoryFlags('d'), { foo: true, bar: true }, 'category `d` has both flags');
	t.deepEqual(getCategoryFlags('e'), { foo: true, bar: true }, 'category `e` has both flags');

	t['throws'](
		function () { getCategoryFlags('not a category'); },
		RangeError,
		'an unknown category throws'
	);

	t.end();
});
