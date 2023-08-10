/*
  3192 - Reverse
  -------
  by jiangshan (@jiangshanmeta) #medium #tuple

  ### Question

  Implement the type version of ```Array.reverse```

  For example:

  ```typescript
  type a = Reverse<['a', 'b']> // ['b', 'a']
  type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
  ```

  > View on GitHub: https://tsch.js.org/3192
*/

/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[]> = T extends [infer F, ...infer Rest]
  ? [...Reverse<Rest>, F]
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>
];

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>
];

/* _____________ 解説 _____________ */
/*
 1. 配列Tを最初の要素と残りの要素に分割する
 inferをつかってTを最初の要素と残りの要素に分割する
 2. 配列が2つ以上の要素であれば[...Reverse<Rest>, F]として、最初の要素を配列の末尾に追加し、残りの要素に対して再帰的にReverseを適用する
 */
