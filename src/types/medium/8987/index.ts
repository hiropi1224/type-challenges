/*
  8987 - Subsequence
  -------
  by jiangshan (@jiangshanmeta) #medium #union

  ### Question

  Given an array of unique elements, return all possible subsequences.

  A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

  For example:

  ```typescript
  type A = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
  ```

  > View on GitHub: https://tsch.js.org/8987
*/

/* _____________ Your Code Here _____________ */

type Subsequence<T extends any[]> = T extends [infer F, ...infer R]
  ? [F, ...Subsequence<R>] | Subsequence<R>
  : T;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<
    Equal<
      Subsequence<[1, 2, 3]>,
      [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
    >
  >
];

/* _____________ 解説 _____________ */
/*
 この型定義は、ジェネリック型Tを受け取り、その型のすべての部分列(subsequence)を列挙する型
 1. Tを最初の要素と残りの要素に分割
 2. Tが分割可能であれば[F, ...Subsequence<R>] | Subsequence<R>、そうでなければTを返す
 */
