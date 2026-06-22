'use strict';

var entries = require('object.entries');

/** @import { Category } from './types' */

/** @type {import('./makeIsCategory')} */
module.exports = function makeIsCategory(ranges) {
	var rangeEntries = entries(ranges);
	return /** @type {(category: unknown) => category is Category<typeof ranges>} */ (function isCategory(category) {
		for (var i = 0; i < rangeEntries.length; i += 1) {
			if (rangeEntries[i][1] === category) {
				return true;
			}
		}
		return false;
	});
};
