/*
  21106 - Combination key type
  -------
  by Nauxscript (@Nauxscript) #medium

  ### Question

  1. Combine multiple modifier keys, but the same modifier key combination cannot appear.
  2. In the `ModifierKeys` provided, the priority of the previous value is higher than the latter value; that is, `cmd ctrl` is OK, but `ctrl cmd` is not allowed.

  > View on GitHub: https://tsch.js.org/21106
*/

/* _____________ Your Code Here _____________ */

type Combs<T extends string[]> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? `${F} ${R[number]}` | Combs<R>
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn'];
type CaseTypeOne =
  | 'cmd ctrl'
  | 'cmd opt'
  | 'cmd fn'
  | 'ctrl opt'
  | 'ctrl fn'
  | 'opt fn';

type cases = [Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>];

/* _____________ 解説 _____________ */
/*
 この型定義は、文字列の配列Tを受け取り、その要素の組み合わせを生成する型
 1. inferを使ってTを分割
 T extends [ infer F extends string, ...infer R extends string[]]としてTを分割する。
 2. Tが分割可能であれば`${F} ${R[number]}` | Combs<R>としてFと残りの要素を結合、残りの要素に対してCombs<R>として再帰的に適用する
 */
