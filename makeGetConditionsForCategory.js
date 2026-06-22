'use strict';

var $RangeError = require('es-errors/range');
var $TypeError = require('es-errors/type');

/** @import { Condition } from './types' */

/** @type {Condition[]} */
var base = [
	'import',
	'node',
	'require',
	'default'
];
/** @type {Condition[]} */
var baseImport = [
	'import',
	'node',
	'default'
];
/** @type {Condition[]} */
var baseRequire = [
	'node',
	'require',
	'default'
];

/** @type {Condition[]} */
var withAddons = [
	'import',
	'node-addons',
	'node',
	'require',
	'default'
];
/** @type {Condition[]} */
var withAddonsImport = [
	'import',
	'node-addons',
	'node',
	'default'
];
/** @type {Condition[]} */
var withAddonsRequire = [
	'node-addons',
	'node',
	'require',
	'default'
];

/** @type {Condition[]} */
var withAddonsModuleSync = [
	'import',
	'node-addons',
	'node',
	'require',
	'module-sync',
	'default'
];
/** @type {Condition[]} */
var withAddonsModuleSyncImport = [
	'import',
	'node-addons',
	'node',
	'module-sync',
	'default'
];
/** @type {Condition[]} */
var withAddonsModuleSyncRequire = [
	'node-addons',
	'node',
	'require',
	'module-sync',
	'default'
];

/** @type {Condition[]} */
var onlyDefault = ['default'];

/** @type {import('./makeGetConditionsForCategory')} */
module.exports = function makeGetConditionsForCategory(isCategory, tables) {
	var addonsCategories = tables.addonsCategories;
	var moduleSyncCategories = tables.moduleSyncCategories;
	var nullCategories = tables.nullCategories;
	var defaultOnlyCategories = tables.defaultOnlyCategories;

	return function getConditionsForCategory(category) {
		if (!isCategory(category)) {
			throw new $RangeError('invalid category ' + category);
		}

		var moduleSystem = arguments.length > 1 ? arguments[1] : null;
		if (
			arguments.length > 1
			&& moduleSystem !== 'import'
			&& moduleSystem !== 'require'
		) {
			throw new $TypeError('invalid moduleSystem: must be `\'require\'` or `\'import\'` if provided, got ' + moduleSystem);
		}

		if (defaultOnlyCategories[category]) {
			return onlyDefault;
		}
		if (nullCategories[category]) {
			return null;
		}

		var hasAddons = !!addonsCategories[category];
		var hasModuleSync = !!moduleSyncCategories[category];

		if (hasAddons && hasModuleSync) {
			return moduleSystem === 'import'
				? withAddonsModuleSyncImport
				: moduleSystem === 'require'
					? withAddonsModuleSyncRequire
					: withAddonsModuleSync;
		}
		if (hasAddons) {
			return moduleSystem === 'import'
				? withAddonsImport
				: moduleSystem === 'require'
					? withAddonsRequire
					: withAddons;
		}
		return moduleSystem === 'import'
			? baseImport
			: moduleSystem === 'require'
				? baseRequire
				: base;
	};
};
