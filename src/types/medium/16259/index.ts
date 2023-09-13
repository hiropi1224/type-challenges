/*
  16259 - ToPrimitive
  -------
  by 前端子鱼 (@mwc) #medium

  ### Question

  Convert a property of type literal (label type) to a primitive type.

  For example

  ```typescript
  type X = {
    name: 'Tom',
    age: 30,
    married: false,
    addr: {
      home: '123456',
      phone: '13111111111'
    }
  }

  type Expected = {
    name: string,
    age: number,
    married: boolean,
    addr: {
      home: string,
      phone: string
    }
  }
  type Todo = ToPrimitive<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/16259
*/

/* _____________ Your Code Here _____________ */

type ToPrimitive<T> = T extends object
  ? T extends (...args: never[]) => unknown
    ? Function
    : {
        [K in keyof T]: ToPrimitive<T[K]>;
      }
  : T extends { valueOf: () => infer R }
  ? R
  : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type PersonInfo = {
  name: 'Tom';
  age: 30;
  married: false;
  addr: {
    home: '123456';
    phone: '13111111111';
  };
  hobbies: ['sing', 'dance'];
  readonlyArr: readonly ['test'];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた型 T をプリミティブ型に変換するための型
 1. Tがオブジェクト型かチェックし、オブジェクト型であれば次の条件式へ進む
 2. Tが関数型かチェックし、関数型であればFunctionを返す。そうでなければ次の条件式へ進む
 3. Tがオブジェクト型かつ関数型でない場合、オブジェクトの各プロパティに対してToPrimitiveを適応する
 4. Tがオブジェクト型でない場合、valueofメソッドの有無をチェックし、メソッドがある場合はinfer Rでその戻り値型を取得する
 */
