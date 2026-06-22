import type { FlagTables } from './types';

declare function makeGetCategoryFlags<C extends string>(
	isCategory: (category: unknown) => category is C,
	flagTables: FlagTables,
): (category: C) => { [flag: string]: boolean };

export = makeGetCategoryFlags;
