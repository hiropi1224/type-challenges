/*
  27862 - CartesianProduct
  -------
  by jazelly (@jazelly) #medium #union

  ### Question

  Given 2 sets (unions), return its Cartesian product in a set of tuples, e.g.
  ```ts
  CartesianProduct<1 | 2, 'a' | 'b'>
  // [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']
  ```

  > View on GitHub: https://tsch.js.org/27862
*/

/* _____________ Your Code Here _____________ */

type Union<T> = T extends T ? [T] : never;

type CartesianProduct<T, U> = T extends T ? [T, ...Union<U>] : never;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<
      CartesianProduct<1 | 2, 'a' | 'b'>,
      [2, 'a'] | [1, 'a'] | [2, 'b'] | [1, 'b']
    >
  >,
  Expect<
    Equal<
      CartesianProduct<1 | 2 | 3, 'a' | 'b' | 'c'>,
      | [2, 'a']
      | [1, 'a']
      | [3, 'a']
      | [2, 'b']
      | [1, 'b']
      | [3, 'b']
      | [2, 'c']
      | [1, 'c']
      | [3, 'c']
    >
  >,
  Expect<Equal<CartesianProduct<1 | 2, 'a' | never>, [2, 'a'] | [1, 'a']>>,
  Expect<
    Equal<
      CartesianProduct<'a', Function | string>,
      ['a', Function] | ['a', string]
    >
  >
];

/* _____________ 解説 _____________ */
/*
 この型定義は、2つの型TとUの直積（Cartesian Product）を計算するための型
 1. 受け取った型を要素とする配列型を生成
 T extends T ? [T] : neverとすることで受け取ったTの型を要素とする配列型を生成する。
 このとき、Tがユニオン型であれば[T1, T2, ...]のような形で要素が生成される。
 2. TとUの直積を計算
 T extends T ? [T, ...Union<U>] : neverとすることで、Tがユニオン型であればTとUnion<U>を持つ型を返し、そうでなければneverを返す。
 */
