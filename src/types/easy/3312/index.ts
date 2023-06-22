/*
  3312 - Parameters
  -------
  by midorizemi (@midorizemi) #初級 #infer #tuple #built-in

  ### 質問

  組み込みの型ユーティリティ`Parameters<T>`を使用せず、`T`からタプル型を構築する型を実装します。

  例えば：

  ```ts
  const foo = (arg1: string, arg2: number): void => {}

  type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
  ```

  > GitHubで確認する：https://tsch.js.org/3312/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer Args
) => any
  ? Args
  : never;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {};
const baz = (): void => {};

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];

/* _____________ 解説 _____________ */
/*
 関数の引数を抽出して型を生成する必要がある。
 Conditional Typesとinferを用いることで関数の引数型を抽出することができる。
 T extends (...args: infer Args) => anyで、Tを関数型として受け取り、引数部分の型をinferを使ってArgsに割り当てる。
 Conditional Typesを使ってTが関数型であるかを判定し、関数型であればArgsを返す。
*/
