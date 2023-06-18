/*
  898 - Includes
  -------
  by null (@kynefuk) #初級 #array

  ### 質問

  JavaScriptの`Array.include`関数を型システムに実装します。この型は、2 つの引数を受け取り、`true`や`false`を出力しなければなりません。

  例えば：

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > GitHubで確認する：https://tsch.js.org/898/ja
*/

/* _____________ ここにコードを記入 _____________ */
type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U
  ? 1
  : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<U, First> extends true
    ? true
    : Includes<Rest, U>
  : false;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];

/* _____________ 解説 _____________ */
/*
 T extends [infer First, ...infer Rest]では、与えられた配列Tの最初の要素をFirst、残りの要素をRestに割り当てている。
 IsEqual<U, First> extends true ? true : Includes<Rest, U>でFirstとUについて比較を行い、等しい場合はtrueを、そうでない場合は残りの要素Restに対して再帰的にIncludesを呼び出す。
 要素数がなくなった場合(T extends [])はfalseを返す。
*/
