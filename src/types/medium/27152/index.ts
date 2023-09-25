/*
  27152 - Triangular number
  -------
  by null (@aswinsvijay) #medium #tuple #array #math

  ### Question

  Given a number N, find the Nth triangular number, i.e. `1 + 2 + 3 + ... + N`

  > View on GitHub: https://tsch.js.org/27152
*/

/* _____________ Your Code Here _____________ */

type Triangular<
  N extends number,
  P extends number[] = [],
  A extends number[] = []
> = P['length'] extends N
  ? A['length']
  : Triangular<N, [0, ...P], [...A, ...P, 0]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、トライアングル数（Triangular Number）を計算するための型
 1. P配列の長さとNを比較
 P配列の長さがNに達した場合はAを返し、そうでなければPに0を追加、Aに現在のステップの結果を追加する
 */
