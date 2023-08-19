/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```

  > View on GitHub: https://tsch.js.org/4471
*/

/* _____________ Your Code Here _____________ */
type Zip<
  T extends unknown[],
  U extends unknown[],
  Res extends unknown[] = []
> = T extends [infer TF, ...infer TRest]
  ? U extends [infer UF, ...infer URest]
    ? Zip<TRest, URest, [...Res, [TF, UF]]>
    : Res
  : Res;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、二つのタプル型 T と U を受け取り、それらの要素をペアにして新しいタプルを作成する型
 1. T、Uをinferを使って最初の要素と残りの要素に分割
 T、Uが分割できなければResを返す。
 2. T、Uがどちらも分割できる場合それぞれの残りの要素に対してZipを再帰的に適応
 Resに[...Res, [TF, UF]]とすることでT、Uそれぞれの最初の要素をResに追加した新しいResを作成することで新しいタプルを作成できる
 */
