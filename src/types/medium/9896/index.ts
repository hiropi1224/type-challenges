/*
  9896 - GetMiddleElement
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  Get the middle element of the array by implementing a `GetMiddleElement` method, represented by an array

  > If the length of the array is odd, return the middle element
  > If the length of the array is even, return the middle two elements

  For example

  ```ts
    type simple1 = GetMiddleElement<[1, 2, 3, 4, 5]>, // expected to be [3]
    type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]> // expected to be [3, 4]
  ```

  > View on GitHub: https://tsch.js.org/9896
*/

/* _____________ Your Code Here _____________ */

type GetMiddleElement<T extends unknown[]> = T extends [
  infer F,
  ...infer R,
  infer L
]
  ? R['length'] extends 0
    ? [F, L]
    : GetMiddleElement<R>
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<
    Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>
  >,
  Expect<
    Equal<
      GetMiddleElement<[() => string, () => number]>,
      [() => string, () => number]
    >
  >,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>
];
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>;

/* _____________ 解説 _____________ */
/*
 この型定義は、配列Tの中から中央の要素を取得する型
 1. 配列を前後とその間の値に分割
 T extends [infer F, ...infer R, infer L] ? とすることでTが前後とその間の値に分割できるかチェックし、分割可能であればRの長さに応じて分岐させる
 2. Rの長さが0の場合
 Rの長さが0の場合はF、Lを中央の値として返し、そうでなければGetMiddleElement<R>として再帰的に呼び出す
 3. 配列が前後とその間の値に分割できなければTをそのまま返す
 */
