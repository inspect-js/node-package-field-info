export type Category<
	R extends { [k: string]: unknown },
> = R[Exclude<keyof R & string, '__proto__'>];

export type Range<
	R extends { [k: string]: unknown },
> = (Exclude<keyof R & string, '__proto__'>);

export type RangePair<
	R extends { [k: string]: unknown },
> = [Range<R>, Category<R>];

export type FlagTables = { [flag: string]: { [category: string]: unknown } };

export type Condition =
	| 'node'
	| 'node-addons'
	| 'import'
	| 'require'
	| 'module-sync'
	| 'default';

export type ModuleSystem = 'import' | 'require';

export type ConditionTables<C extends string = string, V = unknown> = {
	addonsCategories: { [category in C]: V };
	moduleSyncCategories: { [category in C]: V };
	nullCategories: { [category in C]: V };
	defaultOnlyCategories: { [category in C]: V };
};
