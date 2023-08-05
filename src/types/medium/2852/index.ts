/*
  2852 - OmitByType
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  From ```T```, pick a set of properties whose type are not assignable to ```U```.

  For Example

  ```typescript
  type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { name: string; count: number }
  ```

  > View on GitHub: https://tsch.js.org/2852
*/

/* _____________ Your Code Here _____________ */

type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Model {
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string; count: number }>>,
  Expect<
    Equal<
      OmitByType<Model, string>,
      { count: number; isReadonly: boolean; isEnable: boolean }
    >
  >,
  Expect<
    Equal<
      OmitByType<Model, number>,
      { name: string; isReadonly: boolean; isEnable: boolean }
    >
  >
];

/* _____________ 解説 _____________ */
/*
 1. プロパティの値が型Uに一致するか判定する
 T[k] extends U ? never : kとすることでプロパティの値が型Uに一致するかチェックし、一致する場合はプロパティ名を除外し、そうでない場合はそのまま残す
 */
