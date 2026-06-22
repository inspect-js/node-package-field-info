'use strict';

var $RangeError = require('es-errors/range');
var entries = require('object.entries');

/** @type {import('./makeGetCategoryFlags')} */
module.exports = function makeGetCategoryFlags(isCategory, flagTables) {
	var flagEntries = entries(flagTables);
	return function getCategoryFlags(category) {
		if (!isCategory(category)) {
			throw new $RangeError('invalid category ' + category);
		}

		/** @type {ReturnType<ReturnType<typeof makeGetCategoryFlags>>} */
		var flags = {};
		for (var i = 0; i < flagEntries.length; i += 1) {
			flags[flagEntries[i][0]] = !!flagEntries[i][1][category];
		}
		return flags;
	};
};
