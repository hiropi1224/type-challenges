/*
  27932 - MergeAll
  -------
  by scarf (@scarf005) #medium #object #array #union

  ### Question

  Merge variadic number of types into a new type. If the keys overlap, its values should be merged into an union.

  For example:

  ```ts
  type Foo = { a: 1; b: 2 }
  type Bar = { a: 2 }
  type Baz = { c: 3 }

  type Result = MergeAll<[Foo, Bar, Baz]> // expected to be { a: 1 | 2; b: 2; c: 3 }
  ```

  > View on GitHub: https://tsch.js.org/27932
*/

/* _____________ Your Code Here _____________ */

type MergeObj<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K] | U[K]
      : T[K]
    : K extends keyof U
    ? U[K]
    : never;
};

type MergeAll<T, O = {}> = T extends [infer F, ...infer R]
  ? MergeAll<R, MergeObj<F, O>>
  : O;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<
    Equal<
      MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
      { a: 1 | 2; b: 2; c: 3 }
    >
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、オブジェクトのマージと再帰的な操作を行うための型
 1. 2つの型のプロパティをマージ
 オブジェクトのkeyを[keyof T | keyof U]: とすることでTとUの両方のkeyを含む型を生成する。
 オブジェクトのvalueはキーがTのプロパティに存在する場合、T[K]を返し、キーがUのプロパティに存在する場合、U[K]を返す。
 それ以外の場合はT、Uどちらにも存在しないためneverを返す。
 2. ジェネリック型Tのリスト内のオブジェクトを再帰的にマージし、その結果をオブジェクトOに蓄積
 Tが最初の要素と残りの要素に分割可能であればMergeAllに残りの要素RとMergeObj<F, O>を渡して再帰的に呼び出す。
 */
