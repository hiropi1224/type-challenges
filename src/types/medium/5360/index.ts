/*
  5360 - Unique
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Lodash.uniq, Unique<T> takes an Array T, returns the Array T without repeated values.

  ```ts
  type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
  type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
  type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
  type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
  type Res4 = Unique<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]
  ```

  > View on GitHub: https://tsch.js.org/5360
*/

/* _____________ Your Code Here _____________ */

type Include<T extends any[], U> = T extends [infer F, ...infer O]
  ? Equal<F, U> extends true
    ? true
    : Include<O, U>
  : false;

type Unique<T extends any[], R extends any[] = []> = T extends []
  ? R
  : T extends [infer F, ...infer O]
  ? Include<R, F> extends true
    ? Unique<O, R>
    : Unique<O, [...R, F]>
  : R;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<
    Equal<
      Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>,
      [string, number, 1, 'a', 2, 'b']
    >
  >,
  Expect<
    Equal<
      Unique<[unknown, unknown, any, any, never, never]>,
      [unknown, any, never]
    >
  >
];

/* _____________ 解説 _____________ */
/*
 この型定義は、配列の重複する要素を削除し、ユニークな要素のみを含む配列を返す型
 1. 配列内に特定の要素を含むかをチェックする型を定義
 配列Tを最初の要素Fと残りの要素Oに分割し、Fと特定の要素Uを比較する。
 要素が一致する場合はtrueを、そうでなければ残りの要素Oに対して再帰的に比較し、一致する要素が見つからなければfalseを返す。
 2. 配列Tを分割し、累積された配列Rに最初の要素Fが含まれているかチェック
 Include<R, F> とすることでRにTの最初の要素が含まれているかチェックし、含まれていれば残りの要素に対して再帰的にUniqueを適用する。
 含まれていなければFを配列Rに追加して再帰的にUniqueを適用する。
 */
