import type { Condition, ModuleSystem } from './types';

declare function makeGetCategoryInfo<C extends string, F>(
	getConditionsForCategory: (
		category: C,
		moduleSystem?: ModuleSystem,
	) => Condition[] | null,
	getCategoryFlags: (category: C) => F
): (
	category: C,
	moduleSystem?: ModuleSystem,
) => { conditions: Condition[] | null, flags: F };

export = makeGetCategoryInfo;
