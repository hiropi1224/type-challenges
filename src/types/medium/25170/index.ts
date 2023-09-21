/*
  25170 - Replace First
  -------
  by George Flinn (@ProjectFlinn) #medium

  ### Question

  Implement the type ReplaceFirst<T, S, R> which will replace the first occurrence of S in a tuple T with R. If no such S exists in T, the result should be T.

  > View on GitHub: https://tsch.js.org/25170
*/

/* _____________ Your Code Here _____________ */

type ReplaceFirst<
  T extends readonly unknown[],
  S,
  R,
  P extends unknown[] = []
> = T extends [infer L, ...infer Rest]
  ? L extends S
    ? [...P, R, ...Rest]
    : ReplaceFirst<Rest, S, R, [...P, L]>
  : P;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ReplaceFirst<[1, 2, 3], 3, 4>, [1, 2, 4]>>,
  Expect<Equal<ReplaceFirst<['A', 'B', 'C'], 'C', 'D'>, ['A', 'B', 'D']>>,
  Expect<
    Equal<ReplaceFirst<[true, true, true], true, false>, [false, true, true]>
  >,
  Expect<
    Equal<
      ReplaceFirst<[string, boolean, number], boolean, string>,
      [string, string, number]
    >
  >,
  Expect<Equal<ReplaceFirst<[1, 'two', 3], string, 2>, [1, 2, 3]>>,
  Expect<
    Equal<
      ReplaceFirst<['six', 'eight', 'ten'], 'eleven', 'twelve'>,
      ['six', 'eight', 'ten']
    >
  >
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられたreadonlyタプルT内の最初の要素Sを別の要素Rで置き換える型
 1. inferを使ってTを分割
 2. 最初の要素と置き換える対象の要素を比較
 L extends S ? とすることでLとSが一致するかをチェックし、一致する場合は新しい要素Rを含む新しい配列を生成する。
 一致しない場合は残りの要素Restに対して再帰的にReplaceFirstを適用する。
 */
