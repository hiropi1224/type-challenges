/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium #union

  ### Question

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

  ```ts
  type case1 = IsUnion<string> // false
  type case2 = IsUnion<string | number> // true
  type case3 = IsUnion<[string | number]> // false
  ```

  > View on GitHub: https://tsch.js.org/1097
*/

/* _____________ Your Code Here _____________ */

// type Check<T, F = T> = T extends F ? (F extends T ? false : true) : true;
// type IsUnion<T> = true extends Check<T> ? true : false;
type IsNever<T> = [T] extends [never] ? true : false;

type IsUnion<T, F = T> = IsNever<T> extends true
  ? false
  : T extends F
  ? [F] extends [T]
    ? false
    : true
  : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>
];

/* _____________ 解説 _____________ */
/*
 1. Tがnever型かどうかを判定する型を作成する
 IsNever<T>はTがneverであればtrue、そうでなければfalseを返す
 2. IsUnionに渡されたTがneverかどうか判定する
 IsUnion<T, F = T> = IsNever<T> extends true ? とし、Tがnever型であればfalseを返す。
 3. Tがnever型でない場合、T extends F としTがFに割り当て可能かどうか判定する
 4. TがFに割り当て可能な場合、[F] extends [T] ? とし、FがTに割り当て可能かどうか判定する
 5. 最終的にTがユニオン型でなければtrueを、ユニオン型であればfalseを返す
*/
