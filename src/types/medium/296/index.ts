/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #中級 #union

  ### 質問

  Union 型を Union 型の値の順列を含む配列に変換する順列型を実装します。

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > GitHubで確認する：https://tsch.js.org/296/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Permutation<T, K = T> = [K] extends [never]
  ? []
  : T extends T
  ? [T, ...Permutation<Exclude<K, T>>]
  : never;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<
    Equal<
      Permutation<'A' | 'B' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<
    Equal<
      Permutation<'B' | 'A' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];

/* _____________ 解説 _____________ */
/*
 1. Permutation<T, K = T>を定義
 Tはジェネリック型であり、ユニオン型の各要素を表す。Kは内部の型パラメータでデフォルト値としてTを指定する。
 2. [K] extends [never] ? []でユニオン型が空かどうかを判定
 ユニオン型が空の場合は空配列を返す
 3. ユニオン型が空でない場合ユニオン型からTの要素を取り出し、Tを配列の先頭に追加する
 : T extends T ? [T, ...Permutation<Exclude<K, T>>]
 4. 残りの要素に対して再帰的にPermutationを呼び出す
 Permutation<Exclude<K, T>>での再帰的な部分はExclude<K, T>としてTの要素を除外する
*/
