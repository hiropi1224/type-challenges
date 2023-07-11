/*
  119 - ReplaceAll
  -------
  by Anthony Fu (@antfu) #中級 #template-literal

  ### 質問

  文字列`S`に含まれる部分文字列`From`を`To`に置き換える型`ReplaceAll<S, From, To>`を実装します。

  例えば

  ```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''>; // expected to be 'types'
  ```

  > GitHubで確認する：https://tsch.js.org/119/ja
*/

/* _____________ ここにコードを記入 _____________ */

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer R}`
  ? `${F}${To}${ReplaceAll<R, From, To>}`
  : S;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>
];

/* _____________ 解説 _____________ */
/*
 1. Fromが空の文字列かどうかを調べる
 空の文字列の場合、Sはそのまま返される。
 2. Sが${infer F}${From}${infer R}というパターンにマッチするかを調べる
 マッチする場合、infer FはFromより前の文字列、infer RはFromより後の文字列となる。
 3. extends `${infer F}${From}${infer R}`にマッチする場合はReplaceAllを再帰的に呼び出す
 ${infer F}${From}${infer R}にマッチしている場合、置き換え対象の文字列が残っているため
 Fromより後の文字列であるRに対してReplaceAllを再帰的に呼び出す
 4. extends `${infer F}${From}${infer R}`にマッチしない場合はそのままSを返す
*/
