/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */

type FlattenOnce<T extends any[]> = T extends [infer F, ...infer R]
  ? [...(F extends [...infer K] ? K : [F]), ...FlattenOnce<R>]
  : T;
type FlattenDepth<
  T,
  Times extends number = 1,
  P extends any[] = []
> = T extends any[]
  ? P extends { length: Times }
    ? T
    : T extends FlattenOnce<T>
    ? T
    : FlattenDepth<FlattenOnce<T>, Times, [...P, any]>
  : never;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];

/* _____________ 解説 _____________ */
/*
 1. 与えられた多次元配列を1度だけフラットにするFlattenOnceを定義
 1-1. inferを使って受け取ったTを最初の要素Fと残りの要素Rに分割する。
 1-2. Fがネストされた配列であればフラットに、そうでなければF自体を単一の要素を持つ配列とする
 1-3. Rに対してFlattenOnce<R>として再帰的にフラットにする
 2. 与えられた多次元配列を指定した深さまでフラットにするFlattenDepthを定義
 2-1. P extends { length: Time }は配列Pの長さが指定された深さに達したかどうかを判定する
 Pのデフォルトは[]で、FlattenDepthを再帰的に呼び出した際に配列の要素を追加していくため配列の要素が指定した深さに達した際にそれ以上フラット化しないように判定を行う
 2-2. Tが1度だけフラットにできればTを、指定した深さに達していない場合はFlattenOnce<T>の結果を再帰の対象とする
 2-3. FlattenDepth<FlattenOnce<T>, Times, [...P, any]>でTを1度だけフラットにし、深さを1増やして再帰的に呼び出す。
 このときP配列にanyを追加して深さをトラッキングする
 */
