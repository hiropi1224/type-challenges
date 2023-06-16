/*
  268 - If
  -------
  by Pavel Glushkov (@pashutk) #初級 #utils

  ### 質問

  条件値`C`、 `C`が truthy である場合の戻り値の型`T`、`C`が falsy である場合の戻り値の型`F`を受け取る`If`を実装します。
  条件値`C` は`true`か`false`のどちらかであることが期待されますが、`T` と `F` は任意の型をとることができます。

  例えば：

  ```ts
  type A = If<true, 'a', 'b'>; // expected to be 'a'
  type B = If<false, 'a', 'b'>; // expected to be 'b'
  ```

  > GitHubで確認する：https://tsch.js.org/268/ja
*/

/* _____________ ここにコードを記入 _____________ */

type If<C extends boolean, T, F> = C extends true ? T : F;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>
];

// @ts-expect-error
type error = If<null, 'a', 'b'>;

/* _____________ 解説 _____________ */
/*
 条件値`C` は`true`か`false`のどちらかであることが期待されるため、C extends booleanとする。
 条件値 C が true の場合には戻り値の型が T となり、false の場合には戻り値の型が F となる必要があるため、
 条件演算子を使って、C extends trueであればT型、そうでなければF型とすればよい。
 Conditional Types
 https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
*/
