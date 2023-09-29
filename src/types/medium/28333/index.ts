/*
  28333 - Public Type
  -------
  by KaiKai (@kaikaibenkai) #medium #object-keys

  ### Question

  Remove the key starting with `_` from given type `T`.

  > View on GitHub: https://tsch.js.org/28333
*/

/* _____________ Your Code Here _____________ */

type PublicType<T extends object> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<PublicType<{ a: number }>, { a: number }>>,
  Expect<Equal<PublicType<{ _b: string | bigint }>, {}>>,
  Expect<Equal<PublicType<{ readonly c?: number }>, { readonly c?: number }>>,
  Expect<Equal<PublicType<{ d: string; _e: string }>, { d: string }>>,
  Expect<Equal<PublicType<{ _f: () => bigint[] }>, {}>>,
  Expect<Equal<PublicType<{ g: '_g' }>, { g: '_g' }>>,
  Expect<Equal<PublicType<{ __h: number; i: unknown }>, { i: unknown }>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、オブジェクトの型 T から非公開（underscore _ で始まる）のプロパティを除外して、公開されたプロパティだけを持つ新しい型を生成する型
 1. Tの各プロパティキーに対してループを行う
 [K in keyof T as K extends `_${string}` ? never : K]として、各プロパティKに対して条件式を使用する。
 Kが_で始まる文字列と一致する場合はnever、そうでなければKをマップし、値としてT[K]を指定する。
 */
