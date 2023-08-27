/*
  5310 - Join
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Array.join, Join<T, U> takes an Array T, string or number U and returns the Array T with U stitching up.

  ```ts
  type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
  type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
  type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
  type Res3 = Join<["o"], "u">; // expected to be 'o'
  ```

  > View on GitHub: https://tsch.js.org/5310
*/

/* _____________ Your Code Here _____________ */

type Join<T, U extends string | number> = T extends [
  infer F extends string,
  ...infer Rest
]
  ? `${F}${Rest extends [] ? '' : U}${Join<Rest, U>}`
  : '';

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた配列Tの各要素を区切り文字Uで結合するための型
 1. Tを最初の要素と残りの要素に分割
 T extends [infer F, ...infer Rest]に分割できれば最初の要素Fを取り出し、Restが空配列であれば空文字を、そうでなければUを追加する。
 Restに対して再帰的にJoinを行う。
 */
