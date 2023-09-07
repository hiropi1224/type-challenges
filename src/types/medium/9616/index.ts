/*
  9616 - Parse URL Params
  -------
  by Anderson. J (@andersonjoseph) #medium #infer #string #template-literal

  ### Question

  You're required to implement a type-level parser to parse URL params string into an Union.

  ```ts
  ParseUrlParams<':id'> // id
  ParseUrlParams<'posts/:id'> // id
  ParseUrlParams<'posts/:id/:user'> // id | user
  ```

  > View on GitHub: https://tsch.js.org/9616
*/

/* _____________ Your Code Here _____________ */

type ParseUrlParams<T> = T extends `${infer _}:${infer R}`
  ? R extends `${infer A}/${infer B}`
    ? A | ParseUrlParams<B>
    : R
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、文字列TがURLのパラメータ文字列であると仮定して、そのパラメータ文字列から特定の情報を抽出する型
 1. :を基準にTを分割
 T extends ${infer _}:${infer R}`とすることでTを:を基準に分割できるかをチェックする。:を基準に分割できれば/を基準に分割し、そうでなければneverを返す
 2. /を基準にRを分割
 R extends `${infer A}/${infer B}`とすることでAは/の前の文字列、Bは/の後の部分に分割される。
 Rが分割可能であればA | ParseUrlParams<B>を返し、そうでなければRを返す。
 */
