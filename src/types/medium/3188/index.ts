/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #medium #object #tuple

  ### Question

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > View on GitHub: https://tsch.js.org/3188
*/

/* _____________ Your Code Here _____________ */

type TupleToNestedObject<T extends unknown[], U> = T extends [
  infer R,
  ...infer Rest
]
  ? {
      [K in R as R extends PropertyKey ? R : never]: TupleToNestedObject<
        Rest,
        U
      >;
    }
  : U;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<['a', 'b', 'c'], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];

/* _____________ 解説 _____________ */
/*
 1. Tの配列を最初の要素と残りの要素に分割する
 T extends [infer R, infer Rest] とすることで配列要素を分割し、配列の要素が1つ以上の場合とそうでない場合で分岐させる
 2. Tが1つ以上の要素を持つ場合オブジェクトを生成する
 [K in R as R extends PropertyKey ? R : never]とすることでRがPropertyKeyに準拠する場合のみオブジェクトを生成し、そうでない場合は無視する
 3. 残りの要素に対してTupleToNestedObjectを再帰的に適用する
 4. Tが1つ以上の要素を持たない場合はUを返す
 */
