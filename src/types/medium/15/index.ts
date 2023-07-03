/*
  15 - Last of Array
  -------
  by Anthony Fu (@antfu) #中級 #array

  ### 質問

  > この課題ではTypeScript 4.0が推奨されます

  配列 `T` を受け取り、その最後の要素の型を返す汎用的な `Last<T>` を実装してください。

  例えば

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
  ```

  > GitHubで確認する：https://tsch.js.org/15/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Last<T extends any[]> = T extends [...any[], infer Last] ? Last : never;
/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];

/* _____________ 解説 _____________ */
/*
 1. 受け取ったタプル型に対して、T extends [...any[], infer Last]とすることで、末尾以外の要素と末尾の要素に分解する
 ...any[]はTの末尾以外の要素を表し、infer LastはTの最後の要素の型を表す型変数になる。
 2. Tが少なくとも1つの要素を持つ配列であればLastを返し、そうでなければneverを返す

*/
