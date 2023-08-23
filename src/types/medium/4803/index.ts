/*
  4803 - Trim Right
  -------
  by Yugang Cao (@Talljack) #medium #template-literal

  ### Question

  Implement `TrimRight<T>` which takes an exact string type and returns a new string with the whitespace ending removed.

  For example:

  ```ts
  type Trimed = TrimRight<'   Hello World    '> // expected to be '   Hello World'
  ```

  > View on GitHub: https://tsch.js.org/4803
*/

/* _____________ Your Code Here _____________ */

type Blank = ' ' | '\n' | '\t';

type TrimRight<S extends string> = S extends `${infer Rest}${Blank}`
  ? TrimRight<Rest>
  : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた文字列 S を処理し、末尾に空白文字がある限り再帰的にそれを削除する型
 1. inferを使って文字列SをRestとBlankに分割
 末尾に空白文字がある場合は再帰的にTrimRightを呼び出しそうでない場合はSをそのまま返す
 */
