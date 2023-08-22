/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)

  > View on GitHub: https://tsch.js.org/4518
*/

/* _____________ Your Code Here _____________ */

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  I extends any[] = [],
  F extends boolean = I['length'] extends Start ? true : false
> = [T, I['length'] & End] extends [[infer P, ...infer R], never]
  ? F extends true
    ? [N, ...Fill<R, N, Start, End, [...I, 1], F>]
    : [P, ...Fill<R, N, Start, End, [...I, 1]>]
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた配列 T の特定範囲の要素を指定された値 N で埋める型
 1. [T, I['length'] & End] extends [[infer P, ...infer R], never] ?
 I['length'] & EndはインデックスIの長さがEndに達しているかを判定する
 T がまだ走査中であり、かつインデックスが End に達していない場合、F extends true ? ... : ...: インデックスが Start に達しているかどうかに応じて条件分岐
 2. インデックスが Start に達している場合
 [N, ...Fill<R, N, Start, End, [...I, 1], F>]として、配列Tの要素をNで置き換えて再帰的にFillを呼び出し、Iに1を追加する
 2. インデックスが Start に達していない場合
 [P, ...Fill<R, N, Start, End, [...I, 1]>]として、配列Tの最初の要素Pをそのまま残し、再帰的にFillを呼び出し、Iに1を追加する
 */
