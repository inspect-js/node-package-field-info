'use strict';

var entries = require('object.entries');

/** @type {import('./makeGetRangePairs')} */
module.exports = function makeGetRangePairs(ranges) {
	return function getRangePairs() {
		return entries(ranges);
	};
};
