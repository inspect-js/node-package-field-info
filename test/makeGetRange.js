'use strict';

var test = require('tape');

var makeGetRange = require('../makeGetRange');

var fixtures = require('./fixtures');

test('makeGetRange', function (t) {
	var getRange = makeGetRange(fixtures.ranges);

	t.equal(typeof getRange, 'function', 'returns a function');

	t.equal(getRange('a'), '< 2', 'category `a` maps to its range');
	t.equal(getRange('b'), '2.x', 'category `b` maps to its range');
	t.equal(getRange('c'), '3.x', 'category `c` maps to its range');
	t.equal(getRange('d'), '4.x', 'category `d` maps to its range');
	t.equal(getRange('e'), '>= 5', 'category `e` maps to its range');

	t['throws'](
		function () { getRange('not a category'); },
		RangeError,
		'an unknown category throws'
	);

	t.end();
});
