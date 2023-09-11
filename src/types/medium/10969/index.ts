/*
  10969 - Integer
  -------
  by HuaBing (@hbcraft) #medium #template-literal

  ### Question

  Please complete type `Integer<T>`, type `T` inherits from `number`, if `T` is an integer return it, otherwise return `never`.

  > View on GitHub: https://tsch.js.org/10969
*/

/* _____________ Your Code Here _____________ */

type Integer<T extends number> = number extends T
  ? never
  : `${T}` extends `${string}.${string}`
  ? never
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

let x = 1;
let y = 1 as const;

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.0>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた型Tが整数型（小数点を含まない数値）かどうかを判定するための型
 1. Tが数値型か判定
 number extends T ?とすることでTが数値型か判定し、数値型であればneverを返し、そうでなければ次の条件判定を行う。
 2. Tを文字列に変換し、その文字列が小数点を含むか判定
 `${T}` extends `${string}.${string}`とすることでTに小数点を含むかどうかを判定し、小数点を含む場合はneverを返し、そうでなければTを返す。
 */
