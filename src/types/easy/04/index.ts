/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #初級 #union #built-in

  ### 質問

  組み込みの型ユーティリティ`Pick<T, K>`を使用せず、`T`から`K`のプロパティを抽出する型を実装します。

  例えば：

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > GitHubで確認する：https://tsch.js.org/4/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyPick<T, K extends keyof T> = {
  [k in K]: T[k];
};

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

/* _____________ 解説 _____________ */
/*
 TODOの型から特定のkeyのみを抽出、存在しないkeyを抽出しようとするとエラーとする必要がある。
 MyPick<T, K extends keyof T>
 対象のTに含まれるkeyを指定したいため、 K extends keyof Tで型引数に制約を付ける
 extends: https://typescriptbook.jp/reference/generics/type-parameter-constraint#型引数に制約をつける
 keyof: https://typescriptbook.jp/reference/type-reuse/keyof-type-operator

 Kはユニオン型で渡されるためMapped Typesを使って制約を付ける
 Mapped Types: https://typescriptbook.jp/reference/type-reuse/mapped-types
 { [k in K]: T[k] }
 keyはユニオン型で渡されたKに限定するため[k in K]、valueは渡されたKの型定義とするためT[K]でTの型定義を参照する
*/
