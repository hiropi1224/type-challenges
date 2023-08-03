/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.

  For example

  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }

  type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }

  ```

  > View on GitHub: https://tsch.js.org/2759
*/

/* _____________ Your Code Here _____________ */
type Merge<T> = {
  [K in keyof T]: T[K];
};

type RequiredByKeys<T, K extends keyof T = keyof T> = Merge<
  { [Key in K]-?: T[Key] } & { [Key in keyof Omit<T, K>]: T[Key] }
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>
];

/* _____________ 解説 _____________ */
/*
 1. Merge<T>を定義
 この型自体は受け取ったTをそのまま返す型だが、RequiredByKeysでの型合成で利用する。
 2. RequiredByKeysを定義
 オブジェクトの引数は<T, K extends keyof T = keyof T>とすることで、Kはkeyof Tの一部となるよう制約を付ける
 3. { [Key in K]-?: T[Key] }でオブジェクトの一部を必須にする
 受け取ったKをkeyに持つオブジェクトを必須にする
 4. &を使ってオブジェクト型を結合する
 { [Key in K]-?: T[Key] } と { [Key in keyof Omit<T, K>]: T[Key] }の両方の型のプロパティを持つオブジェクト型を生成する
 */
