/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */
type Tuple<N extends number, T extends unknown[] = []> = 0 extends 1
  ? never
  : T['length'] extends N
  ? T
  : Tuple<N, [unknown, ...T]>;

type MinusOne<T extends number> = Tuple<T> extends [unknown, ...infer R]
  ? R['length']
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>
  // Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

/* _____________ 解説 _____________ */
/*
 1. Tuple<N extends number, T extends unknown[] = []>で指定された長さNのタプル型を生成する
 T['length']でタプルの長さを取得し、受け取ったNに一致する場合はTを返し、一致しない場合はunknownを追加して再帰的にTupleを呼び出す
 2. Tuple<T> extends [unknown, ...infer R]で配列を先頭のunknownと残りの要素に分割する
 [unknown, ...infer R]に一致する場合(Tが正の整数)、R['length']を使ってRの長さを取得する。
 一致しない場合は-1を返す。
*/
