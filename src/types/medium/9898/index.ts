/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，ouput: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

type FindEles<
  T extends any[],
  U extends any[] = [],
  S extends any[] = []
> = T extends [infer F, ...infer R]
  ? F extends [...R, ...U][number]
    ? FindEles<R, [...U, F], S>
    : FindEles<R, U, [...S, F]>
  : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた配列型Tの要素の中から特定の条件に基づいて要素を抽出するための型
 1. 配列Tを最初の要素の残りの要素に分割
 2. Fが配列内に含まれるかチェック
 F extends [...R, ...U][number]とすることでFが配列内に含まれているかチェックし、
 含まれていれば一時的な配列UにFを追加してFindElesを再帰的に呼び出す。
 含まれていなければ結果の配列SにFを追加してFindElesを再帰的に呼び出す。
 */
