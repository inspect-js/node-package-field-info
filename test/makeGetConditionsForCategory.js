'use strict';

var test = require('tape');

var makeGetConditionsForCategory = require('../makeGetConditionsForCategory');
var makeIsCategory = require('../makeIsCategory');

var fixtures = require('./fixtures');

test('makeGetConditionsForCategory', function (t) {
	var isCategory = makeIsCategory(fixtures.ranges);
	var getConditionsForCategory = makeGetConditionsForCategory(isCategory, fixtures.conditionTables);

	t.equal(typeof getConditionsForCategory, 'function', 'returns a function');

	t['throws'](
		function () { getConditionsForCategory('not a category'); },
		RangeError,
		'an unknown category throws'
	);

	t['throws'](
		// @ts-expect-error
		function () { getConditionsForCategory('c', 'nonsense'); },
		TypeError,
		'an invalid moduleSystem throws'
	);

	t.equal(getConditionsForCategory('a'), null, 'a null category yields null');
	t.deepEqual(getConditionsForCategory('b'), ['default'], 'a default-only category yields `[default]`');

	t.deepEqual(
		getConditionsForCategory('c'),
		['import', 'node', 'require', 'default'],
		'a base category yields the base conditions'
	);
	t.deepEqual(
		getConditionsForCategory('c', 'require'),
		['node', 'require', 'default'],
		'a base category in require mode drops `import`'
	);
	t.deepEqual(
		getConditionsForCategory('c', 'import'),
		['import', 'node', 'default'],
		'a base category in import mode drops `require`'
	);

	t.deepEqual(
		getConditionsForCategory('d'),
		['import', 'node-addons', 'node', 'require', 'default'],
		'an addons category includes `node-addons`'
	);
	t.deepEqual(
		getConditionsForCategory('d', 'require'),
		['node-addons', 'node', 'require', 'default'],
		'an addons category in require mode drops `import`'
	);
	t.deepEqual(
		getConditionsForCategory('d', 'import'),
		['import', 'node-addons', 'node', 'default'],
		'an addons category in import mode drops `require`'
	);

	t.deepEqual(
		getConditionsForCategory('e'),
		['import', 'node-addons', 'node', 'require', 'module-sync', 'default'],
		'an addons + module-sync category includes both'
	);
	t.deepEqual(
		getConditionsForCategory('e', 'require'),
		['node-addons', 'node', 'require', 'module-sync', 'default'],
		'an addons + module-sync category in require mode drops `import`'
	);
	t.deepEqual(
		getConditionsForCategory('e', 'import'),
		['import', 'node-addons', 'node', 'module-sync', 'default'],
		'an addons + module-sync category in import mode drops `require`'
	);

	t.end();
});
