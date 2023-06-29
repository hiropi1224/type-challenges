/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #中級 #readonly #object-keys

  ### 質問

  2つの型引数`T`と`K`を取る`MyReadonly2<T, K>`を実装します。

  `K`が指定されている場合は、`T`の中の`K`のプロパティのみを読み取り専用にします。`K`が指定されていない場合は、通常の`Readonly<T>`と同様に、すべてのプロパティを読み取り専用にします。

  例えば

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > GitHubで確認する：https://tsch.js.org/8/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyReadonly2<T, K extends keyof T = keyof T> = {
  [p in keyof T as p extends K ? never : p]: T[p];
} & {
  readonly [p in K]: T[p];
};

/* _____________ テストケース _____________ */
import type { Alike, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

/* _____________ 解説 _____________ */
/*
 MyReadonly2<T, K>のKについて、Kが指定されない場合もあるため、デフォルト値を設定する必要がある。
 設定されていない場合は全てのプロパティを読み取り専用とするため、K extends keyof T = keyof Tとする。
 1. Mapped Typesとasによるキーリマッピングを使う
 keyof Tを使ってTのプロパティキーのユニオン型を取得し、それぞれのプロパティに対してマッピングする。
 p extends K ? never : p の条件式によってKに含まれるプロパティキーは除外し、Kに含まれないプロパティキーのみ保持する。
 ここで保持したキーは読み取り専用にする必要はないため、元の型情報であるT[p]のままにする。
 2. マップ型の結果とKのプロパティを結合
 Kに含まれるプロパティキーを持つマップ型に対して読み取り専用とするためにreadonly修飾子を付ける。
 readonly [p in K]: T[p]
 3. & を使って2つのマップ型を結合する
*/
