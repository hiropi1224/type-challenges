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

type MyReadonly<T> = { readonly [P in keyof T]: T[P] };

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
 readonlyを使うことでプロパティを代入負荷にすることができる。(変数自体への代入は許可される)
 https://typescriptbook.jp/reference/values-types-variables/object/readonly-vs-const#readonlyはプロパティへの代入を禁止にするもの
 あとはMapped Typesを使ってTのkeyとTの型を持つreadonlyなオブジェクトを作成すれば良い。
 https://typescriptbook.jp/reference/type-reuse/mapped-types
*/
