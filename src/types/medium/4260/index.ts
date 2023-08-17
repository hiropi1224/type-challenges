/*
  4260 - 文字の組み合わせ
  -------
  by 蛭子屋双六 (@sugoroku-y) #中級 #template-literal #infer #union

  ### 質問

  指定された文字列に含まれる文字をそれぞれ最大で1度だけ使った文字列のすべての組み合わせの型`AllCombinations`を実装します。

  例えば

  ```ts

  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > GitHubで確認する：https://tsch.js.org/4260/ja
*/

/* _____________ ここにコードを記入 _____________ */

type String2Union<S extends string> = S extends `${infer C}${infer REST}`
  ? C | String2Union<REST>
  : never;

type AllCombinations<
  STR extends string,
  S extends string = String2Union<STR>
> = [S] extends [never]
  ? ''
  : '' | { [K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}` }[S];

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<
    Equal<
      AllCombinations<'ABC'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'AB'
      | 'AC'
      | 'BA'
      | 'BC'
      | 'CA'
      | 'CB'
      | 'ABC'
      | 'ACB'
      | 'BAC'
      | 'BCA'
      | 'CAB'
      | 'CBA'
    >
  >,
  Expect<
    Equal<
      AllCombinations<'ABCD'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'D'
      | 'AB'
      | 'AC'
      | 'AD'
      | 'BA'
      | 'BC'
      | 'BD'
      | 'CA'
      | 'CB'
      | 'CD'
      | 'DA'
      | 'DB'
      | 'DC'
      | 'ABC'
      | 'ABD'
      | 'ACB'
      | 'ACD'
      | 'ADB'
      | 'ADC'
      | 'BAC'
      | 'BAD'
      | 'BCA'
      | 'BCD'
      | 'BDA'
      | 'BDC'
      | 'CAB'
      | 'CAD'
      | 'CBA'
      | 'CBD'
      | 'CDA'
      | 'CDB'
      | 'DAB'
      | 'DAC'
      | 'DBA'
      | 'DBC'
      | 'DCA'
      | 'DCB'
      | 'ABCD'
      | 'ABDC'
      | 'ACBD'
      | 'ACDB'
      | 'ADBC'
      | 'ADCB'
      | 'BACD'
      | 'BADC'
      | 'BCAD'
      | 'BCDA'
      | 'BDAC'
      | 'BDCA'
      | 'CABD'
      | 'CADB'
      | 'CBAD'
      | 'CBDA'
      | 'CDAB'
      | 'CDBA'
      | 'DABC'
      | 'DACB'
      | 'DBAC'
      | 'DBCA'
      | 'DCAB'
      | 'DCBA'
    >
  >
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた文字列の文字からすべての可能な組み合わせを生成する型。
 1. 与えられた文字列を文字のユニオン型に変換する型を定義
 S extends `${infer C}${infer Rest}` ? C | String2Union<Rest>とすることで与えられた文字列を先頭文字と残りに分割し、残りの要素に対して再帰的にString2Unionを適用する
 2. 与えられた文字列に対して可能なすべての組み合わせを生成
  [S] extends [never] ? '' | { [K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}` }[S];
  Sがneverでなければ各文字Kから始まる組み合わせに対して残りの文字から生成される組み合わせを再帰的に追加する
 */
