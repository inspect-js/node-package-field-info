import type { Category } from './types';

declare function makeIsCategory<R extends { [k: string]: unknown }>(
	ranges: R,
): (category: unknown) => category is Category<R>;

export = makeIsCategory;
