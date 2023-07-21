/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Diff<O, O1> = {
  [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: (O & O1)[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type A = keyof (Foo & Bar);
type B = keyof (Foo | Bar);

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

/* _____________ 解説 _____________ */
/*
 O & O1の値を除いた新しいオブジェクトを作成する
 1. K in keyof (O & O1)でO、O1の共通のプロパティキーのユニオン型を取得する
 Foo、Barの例だとK in keyof (O & O1)は"name" | "age" | "gender"が取得できる
 2. K extends keyof (O | O1)でKが(O | O1)に含まれるキーかチェックする
 Kが(O | O1)に含まれる場合はneverを、含まれない場合はKとする。
 Foo、Barの例だと K extends keyof (O | O1)は"name" | "age"となり、"gender"のみがオブジェクトのキーとなる
 3. (O & O1)[K]としてプロパティを取得する
*/
