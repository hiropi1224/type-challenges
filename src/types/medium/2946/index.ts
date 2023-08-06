/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > View on GitHub: https://tsch.js.org/2946
*/

/* _____________ Your Code Here _____________ */

type Is<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

type ObjectEntries<T> = Required<{
  [K in keyof T]: [
    K,
    Is<T[K], undefined> extends true ? undefined : Required<T>[K]
  ];
}>[keyof T];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null];

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<
    Equal<
      ObjectEntries<{ key: string | undefined }>,
      ['key', string | undefined]
    >
  >
];

/* _____________ 解説 _____________ */
/*
 1. 型の互換性をチェックするIs型を定義
 T が U の部分型である場合かつ、 U が T の部分型である場合、true を返し、それ以外の場合は false を返す
 2. TのKeyをもつオブジェクトを作成
 { [K in keyof T]: [...] }としてオブジェクトを作成
 3. オブジェクトの値を定義する
 値の最初の値はKeyとし、2番目以降はKeyに対応する値を指定する
 4. 2番目以降の値についてIsを使ってチェックする
 Isを使ってT[K]とundefinedを比較し、undefinedであればundefinedを、そうでなければRequired<T>[K]でTの値を必須にした型を返す
*/
