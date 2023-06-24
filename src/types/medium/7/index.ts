/*
  7 - Readonly
  -------
  by Anthony Fu (@antfu) #初級 #built-in #readonly #object-keys

  ### 質問

  組み込みの型ユーティリティ`Readonly<T>`を使用せず、`T` のすべてのプロパティを読み取り専用にする型を実装します。実装された型のプロパティは再割り当てできません。

  例えば：

  ```ts
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```

  > GitHubで確認する：https://tsch.js.org/7/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

/* _____________ 解説 _____________ */
/*
 読み取り専用とするにはreadonly修飾子を使う。
 https://typescriptbook.jp/reference/values-types-variables/object/readonly-property

 受け取ったオブジェクトに対してreadonly修飾子を追加するため、Mapped Typesを使う。
 https://typescriptbook.jp/reference/type-reuse/mapped-types

 オブジェクトのkeyはK in keyof T とすることでキーの制約する。(keyof Tはオブジェクトのキーをユニオン型に変更するものだと解釈できる)
 valueをT[K]とすることで読み取り専用のT型を返すことができる。
 */
