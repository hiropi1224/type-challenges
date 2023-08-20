/*
  4484 - IsTuple
  -------
  by jiangshan (@jiangshanmeta) #medium #tuple

  ### Question

  Implement a type ```IsTuple```, which takes an input type ```T``` and returns whether ```T``` is tuple type.

  For example:

  ```typescript
  type case1 = IsTuple<[number]> // true
  type case2 = IsTuple<readonly [number]> // true
  type case3 = IsTuple<number[]> // false
  ```

  > View on GitHub: https://tsch.js.org/4484
*/

/* _____________ Your Code Here _____________ */

type IsTuple<T> = [T] extends [never]
  ? false
  : T extends []
  ? true
  : T extends readonly [infer _F, ...infer _R]
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた型がタプル型であるかどうかを判定する型
 1. Tがnever型か判定
 [T] extends [never]とすることでTがnever型かどうかを判定する
 2. Tが空配列か判定
 T extends [] ? true として、Tが空配列であればtrueを返す
 3. Tが読み込み専用のタプル型か判定
 T extends readonly [infer _F, ...infer _R] ? trueとして、Tが読み込み専用のタプル型であればtrueを返す
 4. 上記のいずれにも該当しない場合はfalseを返す
 */
