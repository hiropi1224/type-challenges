/*
  5153 - IndexOf
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

  ```ts
  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
  ```

  > View on GitHub: https://tsch.js.org/5153
*/

/* _____________ Your Code Here _____________ */

type IndexOf<T extends any[], U, A extends any[] = []> = T extends [
  infer F,
  ...infer Rest
]
  ? Equal<F, U> extends true
    ? A['length']
    : IndexOf<Rest, U, [...A, F]>
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、配列 T 内で指定された要素 U のインデックスを見つけるための型
 1. 配列Tを分割
 T extends [infer F, ...infer Rest]として配列を分割し、Equal<F, U>でFとUが等しいかを判定する。
 2. FとUが等しければA['length']でAの配列の長さを返し、そうでなければIndexOfに残りの配列RestとAに最初の要素Fを追加したものを渡して再帰的によびだす
 3. Tの中にUと一致するものがなければ-1を返す
 */
