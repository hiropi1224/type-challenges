/*
  106 - Trim Left
  -------
  by Anthony Fu (@antfu) #中級 #template-literal

  ### 質問

  文字列を受け取り、先頭の空白を削除した新しい文字列を返す `TrimLeft<T>` を実装します。

  例えば

  ```ts
  type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
  ```

  > GitHubで確認する：https://tsch.js.org/106/ja
*/

/* _____________ ここにコードを記入 _____________ */

type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>
];

/* _____________ 解説 _____________ */
/*
 1. 条件付き型を使用して、Sが空の文字列''であるかどうかを確認する
 Sが空文字でなければSをそのまま返す
 2. 空でない場合はS extends `${' ' | '\n' | '\t'}${infer Rest}`とする
 3. 初めの文字が空白文字であればTrimLeftを再帰的に呼び出し、そうでなければSをそのまま返す
*/
