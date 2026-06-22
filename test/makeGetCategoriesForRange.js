'use strict';

var test = require('tape');

var makeGetCategoriesForRange = require('../makeGetCategoriesForRange');

var fixtures = require('./fixtures');

test('makeGetCategoriesForRange', function (t) {
	var getCategoriesForRange = makeGetCategoriesForRange(fixtures.ranges);

	t.equal(typeof getCategoriesForRange, 'function', 'returns a function');

	t.deepEqual(getCategoriesForRange('2.x'), ['b'], 'a range within one category yields just that category');

	t.deepEqual(
		getCategoriesForRange('>= 1'),
		['e', 'd', 'c', 'b', 'a'],
		'a range spanning every category yields all of them, in ranges order'
	);

	t['throws'](
		function () { getCategoriesForRange('not a version'); },
		TypeError,
		'an invalid range throws'
	);

	t.end();
});
