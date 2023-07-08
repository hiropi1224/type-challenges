/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #中級 #template-literal

  ### 質問

  文字列を受け取り、両端の空白を削除した新しい文字列を返す `Trim<T>` を実装します。

  例えば

  ```ts
  type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```

  > GitHubで確認する：https://tsch.js.org/108/ja
*/

/* _____________ ここにコードを記入 _____________ */
type WhiteSpace = ' ' | '\n' | '\t';

type Trim<S extends string> = S extends
  | `${WhiteSpace}${infer T}`
  | `${infer T}${WhiteSpace}`
  ? Trim<T>
  : S;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
];

/* _____________ 解説 _____________ */
/*
 1. type WhiteSpaceで空白を定義する
 2. 条件付き型使ってSの両端に空白があるかを確認する
 両端の空白を削除したいのでS extends `${WhiteSpace}${infer T}` または S extends `${infer T}${WhiteSpace}`となる
 3. 空白が含まれていればTrimを再帰的に呼び出し、そうでなければSを返す
*/
