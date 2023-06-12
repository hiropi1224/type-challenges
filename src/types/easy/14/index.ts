/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #初級 #array

  ### 質問

  配列`T`を受け取り、その最初のプロパティの型を返す`First<T>`を実装します。

  例えば：

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > GitHubで確認する：https://tsch.js.org/14/ja
*/

/* _____________ ここにコードを記入 _____________ */

// type First<T extends any[]> = T extends [] ? never : T[0];
type First<T extends any[]> = T extends [infer First, ...any] ? First : never;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>
];

/* _____________ 解説 _____________ */
/*
 受け取った配列Tの最初のプロパティの型を返せばよいためT[0]となるが、これだとExpect<Equal<First<[]>, never>>,のような場合の対応ができない。
 Conditional Typesを使ってT extends [] ?とすることで、Tが空配列であればnever、そうでなければT[0]とすることができる。
 https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

 また、inferを使って定義することも可能。inferはType inference in conditional types というもので、Conditional Types の構文の中で型をキャプチャする機能。
 https://qiita.com/ringtail003/items/733aff32ddad7d4fda90#本題の-infer-に行こう
 [infer First, ...any]はRest要素であり、最初の要素をFirst、残りの要素を...anyとし、Tが最初の要素を持つ配列であれば、Firstを返し、そうでなければneverを返す。
*/
