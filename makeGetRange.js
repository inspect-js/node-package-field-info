'use strict';

var $RangeError = require('es-errors/range');
var entries = require('object.entries');

/** @type {import('./makeGetRange')} */
module.exports = function makeGetRange(ranges) {
	var rangeEntries = entries(ranges);
	return function getRange(category) {
		for (var i = 0; i < rangeEntries.length; i += 1) {
			if (rangeEntries[i][1] === category) {
				return rangeEntries[i][0];
			}
		}

		throw new $RangeError('no version range found for category ' + category);
	};
};
