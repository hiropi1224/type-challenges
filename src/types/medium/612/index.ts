/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #中級 #template-literal

  ### 質問

  キャメルケースもしくはパスカルケースの文字列を、ケバブケースに置換する方を実装します。

  `FooBarBaz` -> `foo-bar-baz`

  例えば

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">;
  const foobarbaz: FooBarBaz = "foo-bar-baz";

  type DoNothing = KebabCase<"do-nothing">;
  const doNothing: DoNothing = "do-nothing";
  ```

  > GitHubで確認する：https://tsch.js.org/612/ja
*/

/* _____________ ここにコードを記入 _____________ */

type KebabCase<S extends string> = S extends `${infer F}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Uncapitalize<F>}${KebabCase<R>}`
    : `${Uncapitalize<F>}-${KebabCase<R>}`
  : S;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>
];

/* _____________ 解説 _____________ */
/*
 1. Sを最初の文字と残りの文字に分割する
 2. 残りの文字の最初の文字が小文字で始まるかチェックする
 R extends Uncapitalize<R>とすることでRが小文字で始まっているかチェックする。
 Uncapitalizeは全てstring型のプロパティのプロパティ名の１文字目を小文字にするユーティリティ型。
 例えばRがHelloであれば、Uncapitalize<R>はhelloであり、この条件式はfalseなので`${Uncapitalize<F>}-${KebabCase<R>}`が適応され、${F}-helloとなる
 3. Rが小文字で始まる場合はFを小文字に変換し、Rを再帰的に変換する
 4. Rが大文字で始まる場合はFを小文字に変換し、FとRの間にハイフンを挿入する。その後、Rを再帰的に変換する
*/
