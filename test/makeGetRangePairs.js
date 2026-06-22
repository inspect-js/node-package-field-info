'use strict';

var test = require('tape');

var makeGetRangePairs = require('../makeGetRangePairs');

var fixtures = require('./fixtures');

test('makeGetRangePairs', function (t) {
	var getRangePairs = makeGetRangePairs(fixtures.ranges);

	t.equal(typeof getRangePairs, 'function', 'returns a function');

	t.deepEqual(
		getRangePairs(),
		[['>= 5', 'e'], ['4.x', 'd'], ['3.x', 'c'], ['2.x', 'b'], ['< 2', 'a']],
		'yields [range, category] pairs in ranges order'
	);

	t.end();
});
