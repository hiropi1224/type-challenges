/*
  29785 - Deep Omit
  -------
  by bowen (@jiaowoxiaobala) #medium #omit object-keys deep

  ### Question

  Implement a type`DeepOmit`, Like Utility types [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys), A type takes two arguments.

  For example:

  ```ts
  type obj = {
    person: {
      name: string;
      age: {
        value: number
      }
    }
  }

  type test1 = DeepOmit<obj, 'person'>    // {}
  type test2 = DeepOmit<obj, 'person.name'> // { person: { age: { value: number } } }
  type test3 = DeepOmit<obj, 'name'> // { person: { name: string; age: { value: number } } }
  type test4 = DeepOmit<obj, 'person.age.value'> // { person: { name: string; age: {} } }
  ```

  > View on GitHub: https://tsch.js.org/29785
*/

/* _____________ Your Code Here _____________ */

type DeepOmit<T, Paths> = Paths extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? {
        [P in keyof T]: P extends K ? DeepOmit<T[P], R> : T[P];
      }
    : T
  : {
      [K in keyof T as K extends Paths ? never : K]: T[K];
    };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<
    Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>
  >,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<
    Equal<
      DeepOmit<obj, 'person.age.value'>,
      { person: { name: string; age: {} } }
    >
  >
];

/* _____________ 解説 _____________ */
/*
 この型定義は、オブジェクト型 T から指定されたパス Paths を再帰的に除外する型
 1. Pathsがドットで区切られた文字列かチェック
 Path extends `${infer K}.${infer R}` ?とすることでpathがドットで区切られた文字列かチェックする。
 Pathがドットで区切られている場合はKがTのキーに含まれるかを判定し、Kが存在しなければTをそのまま返す。
 Kが含まれている場合、PとKが一致すればそのプロパティについて再帰的にDeepOmitを呼び出す。
 PとKが一致しなければTをそのまま返す。
 2. Pathがドットで区切られていない場合
 Pathのプロパティを除外するために[K in keyof T as K extends Paths ? never : K]: T[K] としてKとPathが一致する場合はneverを返す。
 */
