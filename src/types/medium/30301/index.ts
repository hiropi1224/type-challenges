/*
  30301 - IsOdd
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  return true is a number is odd

  > View on GitHub: https://tsch.js.org/30301
*/

/* _____________ Your Code Here _____________ */

type Odd = 1 | 3 | 5 | 7 | 9;
type Last<T extends string> = T extends `${any}${infer S}${infer R}`
  ? Last<`${S}${R}`>
  : T;

type IsOdd<T extends number> = Last<`${T}`> extends `${Odd}` ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<number>, false>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた数値が奇数であるかどうかを判定するための型
 1. Odd型を定義
 type Odd = 1 | 3 | 5 | 7 | 9で奇数の値（1、3、5、7、9）を列挙型として定義
 2. 受け取った数値の最後の文字を抽出
 T extends `${any}${infer S}${infer R}`でTが少なくとも1つの文字から構成されているかチェックする。
 Tが分割可能な場合、再帰的にLast<`${S}${R}`>として最後の文字を抽出する。
 3. Last<`${T}`>とOddを比較
 Last<`${T}`> extends ${Odd}とすることでTの最後の文字が奇数であるかを判定する。
 */
