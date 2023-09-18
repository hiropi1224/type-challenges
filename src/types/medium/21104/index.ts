/*
  21104 - FindAll
  -------
  by tunamagur0 (@tunamagur0) #medium #template-literal #string

  ### Question

  Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

  > View on GitHub: https://tsch.js.org/21104
*/

/* _____________ Your Code Here _____________ */

type Find<
  T extends string,
  S extends string,
  P extends any[] = [],
  R extends number[] = []
> = T extends `${string}${infer L}`
  ? T extends `${S}${string}`
    ? Find<L, S, [...P, 0], [...R, P['length']]>
    : Find<L, S, [...P, 0], R>
  : R;

type FindAll<T extends string, P extends string> = P extends ''
  ? []
  : Find<T, P>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>
  >,
  Expect<
    Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>
  >,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>
];

/* _____________ 解説 _____________ */
/*
 FindとFindAllは、文字列Tの中からサブ文字列Sが現れる位置（インデックス）を見つけるための型
 1. Tが少なくとも1文字以上の文字列であることをチェック
 T extends `${string}${infer L}` ? とすることでTを先頭の文字とそれ以外に分割する。
 2. 文字列Tの先頭が文字列Sと一致するかチェック
 T extends `${S}${string}` ? とすることでTの先頭がSと一致するかをチェックし、
 一致する場合は Find<L, S, [...P, 0], [...R, P['length']]> とインデックスの配列にP['length']を追加してFindを再帰的に適用する
 一致しない場合はFind<L, S, [...P, 0], R>としてインデックスの配列に変更を加えずにFindを再帰的に適用する
 */
