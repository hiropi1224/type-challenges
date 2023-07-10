/*
  116 - Replace
  -------
  by Anthony Fu (@antfu) #中級 #template-literal

  ### 質問

  文字列`S`に含まれる文字`From`を`To`に一度だけ置き換える型`Replace<S, From, To>`を実装します。

  例えば

  ```ts
  type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // expected to be 'types are awesome!'
  ```

  > GitHubで確認する：https://tsch.js.org/116/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer L}`
  ? `${F}${To}${L}`
  : S;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>
];

/* _____________ 解説 _____________ */
/*
 1. FromがSに含まれるかどうかを調べる
 含まれていない場合はSをそのまま返す
 2. FromがSに含まれる場合は最初に出現するFromをToに置き換える
 infer Fを使ってFromの前の部分文字列を取得する
 infer Lを使ってFromの後の部分文字列を取得する
 3. 最終的な結果としてF + To + Lを返す
*/
