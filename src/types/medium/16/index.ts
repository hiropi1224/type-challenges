/*
  16 - Pop
  -------
  by Anthony Fu (@antfu) #中級 #array

  ### 質問

  > この課題ではTypeScript 4.0が推奨されます

  配列 `T` を受け取り、最後の要素を除いた配列を返す汎用的な `Pop<T>` を実装してください。

  例えば

  ```ts
  type arr1 = ['a', 'b', 'c', 'd']
  type arr2 = [3, 2, 1]

  type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
  type re2 = Pop<arr2> // expected to be [3, 2]
  ```

  **おまけ**: 同様に `Shift`、 `Push`、 `Unshift` も実装できますか？

  > GitHubで確認する：https://tsch.js.org/16/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Pop<T extends any[]> = T extends [...infer R, any] ? R : T;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>
];

/* _____________ 解説 _____________ */
/*
 1. Tが空の配列である場合はそのままT、空配列でなければ最後の要素を取り除いた残りの要素を取得すればよいためConditional Typesとinferを組み合わせ実装する。
*/
