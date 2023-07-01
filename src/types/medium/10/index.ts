/*
  10 - Tuple to Union
  -------
  by Anthony Fu (@antfu) #中級 #infer #tuple #union

  ### 質問

  タプルの値からユニオン型を生成する`TupleToUnion<T>`を実装します。

  例えば

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > GitHubで確認する：https://tsch.js.org/10/ja
*/

/* _____________ ここにコードを記入 _____________ */

type TupleToUnion<T extends unknown[]> = T[number];

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];

/* _____________ 次のステップ _____________ */
/*
 ジェネリック型パラメータ T を制約として unknown[]（タプル型）とする。
 T[number]を使ってＴの要素のユニオン型を生成する。
*/
