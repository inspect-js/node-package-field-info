'use strict';

var test = require('tape');

var makeGetCategoryInfo = require('../makeGetCategoryInfo');
var makeGetConditionsForCategory = require('../makeGetConditionsForCategory');
var makeGetCategoryFlags = require('../makeGetCategoryFlags');
var makeIsCategory = require('../makeIsCategory');

var fixtures = require('./fixtures');

test('makeGetCategoryInfo', function (t) {
	var isCategory = makeIsCategory(fixtures.ranges);
	var getConditionsForCategory = makeGetConditionsForCategory(isCategory, fixtures.conditionTables);
	var getCategoryFlags = makeGetCategoryFlags(isCategory, fixtures.flagTables);
	var getCategoryInfo = makeGetCategoryInfo(getConditionsForCategory, getCategoryFlags);

	t.equal(typeof getCategoryInfo, 'function', 'returns a function');

	t.deepEqual(
		getCategoryInfo('d'),
		{
			conditions: ['node-addons', 'node', 'require', 'default'],
			flags: { foo: true, bar: true }
		},
		'combines conditions (require mode by default) and flags'
	);

	t.deepEqual(
		getCategoryInfo('d', 'import'),
		{
			conditions: ['import', 'node-addons', 'node', 'default'],
			flags: { foo: true, bar: true }
		},
		'passes the moduleSystem through to the conditions'
	);

	t.deepEqual(
		getCategoryInfo('a'),
		{ conditions: null, flags: { foo: false, bar: false } },
		'a null-conditions category yields null conditions'
	);

	t.end();
});
