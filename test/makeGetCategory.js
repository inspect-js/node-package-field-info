'use strict';

var test = require('tape');

var makeGetCategory = require('../makeGetCategory');

var fixtures = require('./fixtures');

test('makeGetCategory', function (t) {
	var getCategory = makeGetCategory(fixtures.ranges);

	t.equal(typeof getCategory, 'function', 'returns a function');

	t.equal(getCategory('1.0.0'), 'a', 'pre-2 version is `a`');
	t.equal(getCategory('2.5.0'), 'b', '2.x version is `b`');
	t.equal(getCategory('3.1.0'), 'c', '3.x version is `c`');
	t.equal(getCategory('4.1.0'), 'd', '4.x version is `d`');
	t.equal(getCategory('5.1.0'), 'e', '>= 5 version is `e`');

	t.equal(getCategory(), getCategory(process.version), 'no argument defaults to process.version');

	t['throws'](
		function () { getCategory('not a version'); },
		RangeError,
		'a version matching no range throws'
	);

	t.end();
});
