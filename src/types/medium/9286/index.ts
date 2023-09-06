/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type FirstUniqueCharIndex<
  T extends string,
  C extends number[] = [],
  P extends string = ''
> = T extends `${infer L}${infer R}`
  ? `${P}${R}` extends `${string}${L}${string}`
    ? FirstUniqueCharIndex<R, [0, ...C], `${P}${L}`>
    : C['length']
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、文字列Tの中で最初に一意の文字が現れる位置のインデックスを見つけるための型
 1. 文字列を最初の文字と残りの文字に分割
 T extends `${infer L}${infer R}`とすることで文字列を最初の文字と残りの文字列に分割できるかチェック
 分割不可であれば-1を返し、分割可能であれば次の条件分岐に進む
 2. 最初の文字が一意の文字であるかチェック
 `${P}${R}` extends `${string}${L}${string}`とすることでLが一意の文字であるかをチェックする。
 Lが一意の文字列であれば残りの文字列に対して再帰的にFirstUniqueCharIndexを適用し、そうでなければCの長さを返す。
 */
