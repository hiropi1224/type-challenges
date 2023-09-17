/*
  18220 - Filter
  -------
  by Muhun Kim (@x86chi) #medium #array #filter

  ### Question

  Implement the type `Filter<T, Predicate>` takes an Array `T`, primitive type or union primitive type `Predicate` and returns an Array include the elements of `Predicate`.

  > View on GitHub: https://tsch.js.org/18220
*/

/* _____________ Your Code Here _____________ */

type Filter<T extends unknown[], P> = T extends [infer F, ...infer R]
  ? F extends P
    ? [F, ...Filter<R, P>]
    : Filter<R, P>
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Falsy = false | 0 | '' | null | undefined;

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられたジェネリック型Tの要素を、特定の型Pと一致するものだけをフィルタリングする型
 1. inferを使ってTを分割
 T extends [infer F, ...infer R] でTを最初の要素と残りの要素に分割する。
 分割可能であれば次の条件へ移行し、そうでなければ空配列を返す。
 2. Fが型Pと一致するかチェック
 最初の要素とPが一致するかをチェックし、一致すればFを配列に追加し、残りの要素に対して再帰的にFilterを適用する。
 一致しなければFを配列に追加せず、残りの要素に対して再帰的にFilterを適用する。
 */
