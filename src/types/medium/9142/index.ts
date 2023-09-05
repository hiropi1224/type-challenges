/*
  9142 - CheckRepeatedChars
  -------
  by Hong (@RThong) #medium #union #string

  ### Question

  Implement type ```CheckRepeatedChars<S>``` which will return whether type ```S``` contains duplicated chars?

  For example:

  ```ts
  type CheckRepeatedChars<'abc'>   // false
  type CheckRepeatedChars<'aba'>   // true
  ```

  > View on GitHub: https://tsch.js.org/9142
*/

/* _____________ Your Code Here _____________ */

type CheckRepeatedChars<T extends string> = T extends `${infer L}${infer R}`
  ? R extends `${string}${L}${string}`
    ? true
    : CheckRepeatedChars<R>
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた文字列 T に同じ文字が連続して出現するかどうかをチェックする型
 1. Tを最初の文字と残りの文字に分割
 inferを使って、T extends `${infer L}${infer R}`とすることでTを最初の文字と残りの文字に分割可能かチェックする。
 2. 残りの文字の中にLが含まれているかをチェック
 Tが最初の文字に分割可能であればR extends `${string}${L}${string}`とすることで残りの文字内にLが含まれているかチェックする。
 Lが含まれていればtrueを返し、含まれていなければRに対して再帰的にCheckRepeatedCharsを適用する
 */
