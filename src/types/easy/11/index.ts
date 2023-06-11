/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #easy #object-keys

  ### Question

  Given an array, transform it into an object type and the key/value must be in the provided array.

  For example:

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > View on GitHub: https://tsch.js.org/11
*/

/* _____________ Your Code Here _____________ */

type TupleToObject<T extends readonly (string | number)[]> = {
  [P in T[number]]: P;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const tupleMix = [1, '2', 3, '4'] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: 'tesla';
        'model 3': 'model 3';
        'model X': 'model X';
        'model Y': 'model Y';
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

/* _____________ 解説 _____________ */
/*
 配列からオブジェクトの型定義を生成するため、Mapped Typesを使う
 T extends readonly any[]は、文字列、数字を取り得るため(string | number)[]とする
 Indexed Access Typesを使って[P in T[number]]とし、生成する型はkey、value同名のため、 [P in T[number]]: Pで良い。
 https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
*/
