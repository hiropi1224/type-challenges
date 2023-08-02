/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.

  For example

  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```

  > View on GitHub: https://tsch.js.org/2757
*/

/* _____________ Your Code Here _____________ */

type Merge<T> = {
  [K in keyof T]: T[K];
};

type PartialByKeys<T, K extends keyof T = keyof T> = Merge<
  { [Key in K]?: T[Key] } & { [Key in keyof Omit<T, K>]: T[Key] }
>;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>
];

/* _____________ 解説 _____________ */
/*
 1. Merge<T>を定義
 この型自体は受け取ったTをそのまま返す型だが、PartialByKeysでの型合成で利用する。
 2. PartialByKeysを定義
 オブジェクトの引数は<T, K extends keyof T = keyof T>とすることで、Kはkeyof Tの一部となるよう制約を付ける
 3. { [Key in K]?: T[Key] }でオブジェクトの一部をオプショナルにする
 受け取ったKをkeyに持つオブジェクトをオプショナルにする
 4. &を使ってオブジェクト型を結合する
 { [Key in K]?: T[Key] } と { [Key in keyof Omit<T, K>]: T[Key] }の両方の型のプロパティを持つオブジェクト型を生成する
 */
