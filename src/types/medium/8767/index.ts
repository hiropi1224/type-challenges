/*
  8767 - Combination
  -------
  by Homyee King (@HomyeeKing) #medium #array #application #string

  ### Question

  Given an array of strings, do Permutation & Combination.
  It's also useful for the prop types like video [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)

  ```ts
  // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
  type Keys = Combination<['foo', 'bar', 'baz']>
  ```

  > View on GitHub: https://tsch.js.org/8767
*/

/* _____________ Your Code Here _____________ */

type Combination<T extends string[], U = T[number], A = U> = U extends string
  ? U | `${U} ${Combination<[], Exclude<A, U>>}`
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<
    Equal<
      Combination<['foo', 'bar', 'baz']>,
      | 'foo'
      | 'bar'
      | 'baz'
      | 'foo bar'
      | 'foo bar baz'
      | 'foo baz'
      | 'foo baz bar'
      | 'bar foo'
      | 'bar foo baz'
      | 'bar baz'
      | 'bar baz foo'
      | 'baz foo'
      | 'baz foo bar'
      | 'baz bar'
      | 'baz bar foo'
    >
  >
];

/* _____________ 解説 _____________ */
/*
 この型定義は、文字列の配列からの組み合わせ（Combination）を生成する型
 1. Combinationが受け取る引数を指定
 Tは文字列配列、UはTの要素型、AはUのエイリアス。
 2. Uが文字列型であるかチェック
 U extends string ? としてUが文字列であればUか`${U} ${Combination<[], Exclude<A, U>>}`を返す。
 ${U} ${Combination<[], Exclude<A, U>>}では現在の文字列UとUを除外したものを半角スペースで結合
 */
