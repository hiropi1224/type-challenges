/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer

  ### Question

  Drop a specified char from a string.

  For example:

  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```

  > View on GitHub: https://tsch.js.org/2070
*/

/* _____________ Your Code Here _____________ */

type DropChar<S extends string, C extends string> = S extends `${C}${infer R}`
  ? DropChar<R, C>
  : S extends `${infer B}${infer D}`
  ? `${B}${DropChar<D, C>}`
  : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>
];

/* _____________ 解説 _____________ */
/*
 1. Sが`${C}${infer R}`のパターンに一致するかチェックする
 Sの先頭が受け取ったCで始まる場合、Cを取り除いた残りのRに対してDropCharを再帰的に呼び出す
 2. Sが`${infer B}${infer D}`のパターンに一致するかチェックする
 SがCから始まらない場合、Bを残して残りのDに対してDropCharを再帰的に呼び出す
 3. Sから文字列Cが全て取り除かれた場合、再帰処理を終了する
*/
