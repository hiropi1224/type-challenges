/*
  2 - Get Return Type
  -------
  by Anthony Fu (@antfu) #中級 #infer #built-in

  ### 質問

  組み込みの型ユーティリティ`ReturnType<T>`を使用せず、`T`の戻り値の型を取得する型を実装します。

  例えば

  ```ts
  const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }

  type a = MyReturnType<typeof fn> // should be "1 | 2"
  ```

  > GitHubで確認する：https://tsch.js.org/2/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
];

type ComplexObject = {
  a: [12, 'foo'];
  bar: 'hello';
  prev(): number;
};

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

/* _____________ 解説 _____________ */
/*
 Tの戻り値の型を取得する型を実装する。
 Conditional Typesを使ってTが関数型かどうかを判定し、inferを使って戻り値の型を取得する。
*/
