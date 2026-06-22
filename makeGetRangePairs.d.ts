import type { RangePair } from './types';

declare function makeGetRangePairs<R extends { [k: string]: unknown }>(
	ranges: R,
): () => RangePair<R>[];

export = makeGetRangePairs;
