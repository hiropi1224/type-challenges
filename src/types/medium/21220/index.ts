/*
  21220 - Permutations of Tuple
  -------
  by null (@gaac510) #medium #union #tuple #conditional type #recursion

  ### Question

  Given a generic tuple type `T extends unknown[]`, write a type which produces all permutations of `T` as a union.

  For example:

  ```ts
  PermutationsOfTuple<[1, number, unknown]>
    Should return:
    | [1, number, unknown]
    | [1, unknown, number]
    | [number, 1, unknown]
    | [unknown, 1, number]
    | [number, unknown, 1]
    | [unknown, number ,1]
  ```

  > View on GitHub: https://tsch.js.org/21220
*/

/* _____________ Your Code Here _____________ */

type PermutationsOfTuple<
  T extends unknown[],
  Prev extends unknown[] = []
> = T extends [infer F, ...infer R]
  ?
      | [F, ...PermutationsOfTuple<[...Prev, ...R]>]
      | (R extends [] ? never : PermutationsOfTuple<R, [...Prev, F]>)
  : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectFalse } from '@type-challenges/utils';

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<
    Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>
  >,
  Expect<
    Equal<
      PermutationsOfTuple<[any, unknown, never]>,
      | [any, unknown, never]
      | [unknown, any, never]
      | [unknown, never, any]
      | [any, never, unknown]
      | [never, any, unknown]
      | [never, unknown, any]
    >
  >,
  Expect<
    Equal<
      PermutationsOfTuple<[1, number, unknown]>,
      | [1, number, unknown]
      | [1, unknown, number]
      | [number, 1, unknown]
      | [unknown, 1, number]
      | [number, unknown, 1]
      | [unknown, number, 1]
    >
  >,
  ExpectFalse<Equal<PermutationsOfTuple<[1, number, unknown]>, [unknown]>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられたタプルTの要素の順列（permutations）を生成する型
 1. inferを使ってTを分割
 2. Fを含む新しい順列を生成
 [F, ...PermutationsOfTuple<[...Prev, ...R]>]とすることでFを含む新しい順列を生成する。
 PermutationsOfTupleにこれまでの要素Prevと残りの要素Rを渡して再帰的に呼び出す。
 3. Rの要素に応じて新しい順列を生成する。
 Rが空配列であればneverを返し、そうでなければPermutationsOfTupleにRと[...Prev, F]を渡して再帰的に呼び出す
 */
