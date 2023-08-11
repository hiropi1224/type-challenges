/*
  3196 - Flip Arguments
  -------
  by jiangshan (@jiangshanmeta) #medium #arguments

  ### Question

  Implement the type version of lodash's ```_.flip```.

  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```

  > View on GitHub: https://tsch.js.org/3196
*/

/* _____________ Your Code Here _____________ */

type Reverse<K> = K extends [infer U, ...infer R] ? [...Reverse<R>, U] : K;
type FlipArguments<T extends (...args: any[]) => any> = T extends (
  ...args: [...infer A]
) => infer R
  ? (...args: Reverse<A>) => R
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
];

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>
];

/* _____________ 解説 _____________ */
/*
 1. タプル型の要素を逆転するReverseを定義する
 K extends [infer U, ... infer R] ? [...Reverse<R>, U] : Kとすることで
 受け取ったKが1つ以上の要素を持つタプル型であれば最初の要素を配列の末尾に追加してReverseを再帰的に適応する
 2. 与えられた関数型Tの引数を逆転させる
 T extends (...args: ... infer A) => infer Rとすることで引数の型をA、返り値の型をRという形で取得できる
 Tが関数型であれば(...args; Reverse<A>) => Rとすることで引数の順序を逆転させた新しい関数型を生成する
 */
