/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #中級 #array

  ### 質問

  この課題では、受け取った配列をフラット化した型を出力する型を書く必要があります。

  例えば:

  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]> // [1, 2, 3, 4, 5]
  ```

  > GitHubで確認する：https://tsch.js.org/459/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Flatten<T extends unknown[]> = T extends [infer F, ...infer R]
  ? F extends unknown[]
    ? [...Flatten<F>, ...Flatten<R>]
    : [F, ...Flatten<R>]
  : T;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>,
      [{ foo: 'bar'; 2: 10 }, 'foobar']
    >
  >
];

// @ts-expect-error
type error = Flatten<'1'>;

/* _____________ 解説 _____________ */
/*
 1. Tに制約として任意の型を満たすように定義
 T extends unknown[]とすることでTが任意の配列であるよう制約
 2. inferを使って配列の要素を分割
 T extends [infer F, ...infer R]とすることでTが最低2つの要素を持つ配列であるかをチェックする。
 Tが2つ以上の要素を持つ場合は最初の要素をF、残りの要素をRに割り当てる。
 3. Fの型をチェックする
 Fが配列であればF、RともにFlattenを再帰的に呼び出し、[...Flatten<F>, ...Flatten<R>]とすることで配列を作成する。
 Fが単一の型であれば[F, ...Flatten<R>]の形で、Fはそのまま保持し、Rに対してFlattenを再帰的に呼び出す。
*/
