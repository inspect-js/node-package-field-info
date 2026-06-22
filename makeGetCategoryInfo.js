'use strict';

/** @type {import('./makeGetCategoryInfo')} */
module.exports = function makeGetCategoryInfo(
	getConditionsForCategory,
	getCategoryFlags
) {
	return function getCategoryInfo(category) {
		var moduleSystem = arguments.length > 1 ? arguments[1] : 'require';
		return {
			conditions: getConditionsForCategory(category, moduleSystem),
			flags: getCategoryFlags(category)
		};
	};
};
