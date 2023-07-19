/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #中級 #object

  ### 質問

  2 つの型をマージして新しい型を作ります。2 つ目に指定した型のキーは 1 つ目の型のキーを上書きします。

  例えば

  ```ts
  type foo = {
    name: string;
    age: string;
  }
  type coo = {
    age: number;
    sex: string
  }

  type Result = Merge<foo,coo>; // expected to be {name: string, age: number, sex: string}
  ```

  > GitHubで確認する：https://tsch.js.org/599/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};
/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];

/* _____________ 解説 _____________ */
/*
 1. 2つの型をマージするためにFとSの両方を含むキーのユニオン型を作成する
 [K in keyof F | keyof S]とすることでFとSの両方のキーを含むオブジェクトのキーを作成することができる
 2. KがSのプロパティキーである場合のマッピングを行う
 キーKがSのプロパティキーの一つである場合に、S[K]（SのKプロパティの型）とマッピングする
 3. KがFのプロパティキーである場合のマッピングを行う
 キーKがFのプロパティキーの一つである場合に、F[K]（FのKプロパティの型）とマッピングする
*/
