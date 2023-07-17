/*
  529 - Absolute
  -------
  by Andrey Krasovsky (@bre30kra69cs) #中級 #math #template-literal

  ### 質問

  srting, number または bigint を受け取り、正の数を出力する `Absolute` 型を実装します。

  例えば

  ```ts
  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
  ```

  > GitHubで確認する：https://tsch.js.org/529/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer R}`
  ? R
  : `${T}`;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>
];

/* _____________ 解説 _____________ */
/*
 1. Tが負の数であるかチェックする
 `${T}` extends `-${infer R}` ? とすることでTが負の数であるかをチェックする。
 Tが負の数であれば絶対値を表す型としてRを、そうでなければＴを返す。
*/
