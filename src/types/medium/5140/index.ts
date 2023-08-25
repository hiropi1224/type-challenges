/*
  5140 - Trunc
  -------
  by jiangshan (@jiangshanmeta) #medium #template-literal

  ### Question

  Implement the type version of ```Math.trunc```, which takes string or number and returns the integer part of a number by removing any fractional digits.

  For example:

  ```typescript
  type A = Trunc<12.34> // 12
  ```

  > View on GitHub: https://tsch.js.org/5140
*/

/* _____________ Your Code Here _____________ */

// type Trunc<T extends string | number> = `${T}` extends `${infer H}.${number}`
//   ? H
//   : `${T}` extends `.${infer F}`
//   ? F extends '.'
//     ? '0'
//     : `${F}`
//   : `${T}`;

type Trunc<
  T extends string | number,
  A extends string = `${T}` extends `${infer RL}${string}`
    ? RL extends '.'
      ? '0'
      : ''
    : ''
> = `${T}` extends `${infer L}${infer R}`
  ? L extends '.'
    ? A
    : Trunc<R, `${A}${L}`>
  : A;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、文字列または数値を指定された小数点以下の桁数に切り詰める型
 1. Truncの第二引数に小数点以下の桁数を指定する型を定義
 A extends string = `${T}` extends `${infer RL}${string}`として、TをRLと文字列に分割する。
 RL extends '.'であれば'0'を、そうでなければ''を返す。
 2. Tを最初の文字と残りの文字に分割
 `${T}` extends `${infer L}${infer R}`としてTを分割し、最初の要素が'.'と一致するかを判定する。
 一致する場合はAを返し、そうでない場合はAに最初の要素を追加して更新し、再帰的にTruncを呼び出す。
 */
