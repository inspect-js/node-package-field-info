'use strict';

var flatMap = require('array.prototype.flatmap');
var entries = require('object.entries');
var intersects = require('semver').intersects;

/** @type {import('./makeGetCategoriesForRange')} */
module.exports = function makeGetCategoriesForRange(ranges) {
	var rangeEntries = entries(ranges);
	return function getCategoriesForRange(rangeA) {
		return flatMap(rangeEntries, function (entry) {
			return intersects(rangeA, entry[0]) ? [entry[1]] : [];
		});
	};
};
