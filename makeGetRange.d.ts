import type { Category, Range } from './types';

declare function makeGetRange<R extends { [k: string]: unknown }>(
	ranges: R,
): (category: Category<R>) => Range<R>;

export = makeGetRange;
