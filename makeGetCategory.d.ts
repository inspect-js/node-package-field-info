import type { Category } from './types';

declare function makeGetCategory<R extends { [k: string]: unknown }>(
	ranges: R,
): (nodeVersion?: string) => Category<R>;

export = makeGetCategory;
