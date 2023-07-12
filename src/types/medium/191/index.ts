/*
  191 - Append Argument
  -------
  by Maciej Sikora (@maciejsikora) #中級 #arguments

  ### 質問

  与えられた関数型 `Fn` と任意の型 `A` に対して、第一引数に `Fn` を取り、第二引数に `A` を取り、`Fn` の引数に `A` を追加した関数型 `G` を生成します。

  例えば、

  ```typescript
  type Fn = (a: number, b: string) => number

  type Result = AppendArgument<Fn, boolean>
  // expected be (a: number, b: string, x: boolean) => number
  ```

  > この質問は、[@maciejsikora](https://github.com/maciejsikora) による[元の記事](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c)から移植されました。

  > GitHubで確認する：https://tsch.js.org/191/ja
*/

/* _____________ ここにコードを記入 _____________ */

type AppendArgument<Fn extends (...args: any[]) => unknown, A> = Fn extends (
  ...args: infer Args
) => infer R
  ? (...args: [...Args, A]) => R
  : Fn;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>
];

/* _____________ 解説 _____________ */
/*
 1. Fnの型パラメータを定義する
 Fn extends (...args: any[]) => unknownとし、Fnが可変長引数を持ち、その引数は任意の型であることを表す
 2. Fnの引数、返り値の型を取得する
 ...args: infer ArgsとすることでFnの引数のタプル型を取得できる。Fnが関数型であることを確認し、返り値の型をinfer Rとして取得する
 3. 条件付き型を使ってFnが関数の場合のみ既存の引数リストにAを追加する
 (...args: [...Args, A]) => R とすることで引数がAを含むタプル型となり、引数にAを追加した関数型Gが生成できる。
*/
