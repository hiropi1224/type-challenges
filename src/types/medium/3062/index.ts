/*
  3062 - Shift
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.shift```

  For example

  ```typescript
  type Result = Shift<[3, 2, 1]> // [2, 1]
  ```

  > View on GitHub: https://tsch.js.org/3062
*/

/* _____________ Your Code Here _____________ */

// type Shift<T extends any[]> = T extends [infer _, infer R] ? R : never;

type Shift<T extends any[]> = T extends []
  ? []
  : T extends [any, ...infer R]
  ? R
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>
];

/* _____________ 解説 _____________ */
/*
 1. 受け取ったTが空配列の場合の考慮
 T extends [] ? [] とすることでTが空配列であれば[]を返す
 2. inferを使って配列の最初の要素と残りの要素で分割する
 3. T extends [any, infer R] ? R : neverでチェックする
 Tが最初の要素を持つタプル型であればRを返し、そうでなければneverを返す
 */
