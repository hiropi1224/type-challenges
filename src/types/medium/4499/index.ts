/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```

  > View on GitHub: https://tsch.js.org/4499
*/

/* _____________ Your Code Here _____________ */

type Chunk<
  T extends any[],
  N extends number = 1,
  Chunked extends any[] = []
> = T extends [infer F, ...infer Rest]
  ? Chunked['length'] extends N
    ? [Chunked, ...Chunk<T, N>]
    : Chunk<Rest, N, [...Chunked, F]>
  : Chunked extends []
  ? Chunked
  : [Chunked];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた配列 T を指定されたサイズ N の部分配列に分割する型
 1. Tが最初の要素と残りの要素に分割可能か判定
 T extends [infer F, ...infer Rest] ? とすることでTが分割可能か判定する
 1-1. Tが分割可能であればChunkedの要素数がNに達しているか判定し、達している場合は[Chunked, ...Chunk<T, N>]とする
 1-2. ChunkedがNに達していなければRestと最初の要素のFをChunkedに追加して再帰的にChunkを呼び出す
 2. Chunked が空の場合はChunkedをそのまま返し、そうでなければChunkedを配列にラップして返す
 */
