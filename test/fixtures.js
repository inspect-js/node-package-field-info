'use strict';

module.exports = {
	ranges: {
		__proto__: null,
		'>= 5': 'e',
		'4.x': 'd',
		'3.x': 'c',
		'2.x': 'b',
		'< 2': 'a'
	},
	flagTables: {
		foo: { __proto__: null, b: true, c: true, d: true, e: true },
		bar: { __proto__: null, d: true, e: true }
	},
	conditionTables: {
		addonsCategories: { __proto__: null, d: true, e: true },
		moduleSyncCategories: { __proto__: null, e: true },
		nullCategories: { __proto__: null, a: true },
		defaultOnlyCategories: { __proto__: null, b: true }
	}
};
