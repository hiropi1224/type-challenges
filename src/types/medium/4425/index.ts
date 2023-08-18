/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type Search<T, U, C extends number[] = []> = C['length'] extends T
  ? T
  : C['length'] extends U
  ? U
  : Search<T, U, [0, ...C]>;

type GreaterLen<
  T extends string,
  U extends string
> = T extends `${string}${infer TR}`
  ? U extends `${string}${infer UR}`
    ? GreaterLen<TR, UR>
    : 1
  : U extends ''
  ? 0
  : -1;

type GreaterUnitsDigit<T extends number, U extends number> = Search<
  T,
  U
> extends T
  ? false
  : true;

type GreaterDiffDigit<
  T extends string,
  U extends string
> = T extends `${infer TL extends number}${infer TR}`
  ? U extends `${infer UL extends number}${infer UR}`
    ? TL extends UL
      ? GreaterDiffDigit<TR, UR>
      : GreaterUnitsDigit<TL, UL>
    : never
  : never;

type GreaterThan<T extends number, U extends number> = T extends U
  ? false
  : GreaterLen<`${T}`, `${U}`> extends 0
  ? GreaterDiffDigit<`${T}`, `${U}`>
  : GreaterLen<`${T}`, `${U}`> extends 1
  ? true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

/* _____________ 解説 _____________ */
/*
 この型定義では数値または文字列に関する比較操作を行う
 1. Search 型
 数値T、Uが与えられ、数値の配列Cを使ってTとUの関係を調べる。
 TがCの長さに一致、またはUがCの長さに一致した場合に該当する数値を返し、そうでなければCの長さを拡張した新しい配列を作成して再帰的に探索を行う。
 2. GreaterLen 型
 2つの文字列T、Uに対して、文字列を再帰的に1文字ずつ取り出しながら、桁数を数えることでTの桁数がUの桁数より大きいかを判定する。
 3. GreaterUnitsDigit 型
 二つの数値TとUに対して、Tの一の位がUより大きいかを判定する。
 4. GreaterDiffDigit 型
 二つの文字列TとUに対して、最上位の桁から順に一致している桁を探し、一致しない桁の大小を比較する。
 5. GreaterThan 型
  二つの数値TとUの大小関係を比較する。
  TとUが等しい場合はfalseを返し、それ以外の場合、TとUの桁数を比較して判断。
  桁数が同じ場合は、GreaterDiffDigit 型を使用して桁ごとの比較。
  桁数が異なる場合は、桁数だけで大小を判断。
 */
