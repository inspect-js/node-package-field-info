import type { Condition, ConditionTables, ModuleSystem } from './types';

declare function makeGetConditionsForCategory<C extends string>(
	isCategory: (category: unknown) => category is C,
	tables: ConditionTables
): (category: C, moduleSystem?: ModuleSystem) => Condition[] | null;

export = makeGetConditionsForCategory;
