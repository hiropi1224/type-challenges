/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #中級 #union #built-in

  ### 質問

  組み込みの型ユーティリティ`Omit<T, K>`を使用せず、`T`のプロパティから`K`を削除する型を実装します。

  例えば

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > GitHubで確認する：https://tsch.js.org/3/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
];

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

/* _____________ 解説 _____________ */
/*
 1. keyof T を使ってTの全てのプロパティキーのユニオン型を取得する
 2. asとConditional Typesを使ってneverを出すことで、キーの絞り込みを行う
 https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
 P in keyof T as P extends K ? never : Pとすることで、PはTのキーのユニオン型であり、PがKに代入可能な場合はnever、そうでなければPがキーとして使われる
 3. valueは元のオブジェクトの値を使うため、T[P]とする
*/
