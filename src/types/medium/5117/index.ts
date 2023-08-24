/*
  5117 - Without
  -------
  by Pineapple (@Pineapple0919) #medium #union #array

  ### Question

  Implement the type version of Lodash.without, Without<T, U> takes an Array T, number or array U and returns an Array without the elements of U.

  ```ts
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
  ```

  > View on GitHub: https://tsch.js.org/5117
*/

/* _____________ Your Code Here _____________ */
type ToUnion<T> = T extends any[] ? T[number] : T;

type Without<T, U> = T extends [infer F, ...infer Rest]
  ? F extends ToUnion<U>
    ? Without<Rest, U>
    : [F, ...Without<Rest, U>]
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、型 T から型 U に含まれる要素を取り除く型
 1. 配列型をユニオン型に変換するToUnionを定義
 T extends any[] ? T[number] : TとすることでTが配列であればユニオン型を返す型を定義する。
 2. inferを使って配列を最初の要素と残りの要素に分割
 T extends [infer F, ...infer Rest]として配列が分割できれば最初の要素とUを比較する。
 3. 配列の最初の要素がUと一致していれば残りの要素に対してWithoutを適用し、そうでなければ最初の要素を追加し、残りの要素に対してWithoutを適用する
 */
