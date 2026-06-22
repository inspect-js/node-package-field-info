import type { Category } from './types';

declare function makeGetCategoriesForRange<R extends { [k: string]: unknown }>(
	ranges: R,
): (rangeA: string) => Category<R>[];

export = makeGetCategoriesForRange;
