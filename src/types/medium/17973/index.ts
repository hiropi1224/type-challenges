/*
  17973 - DeepMutable
  -------
  by cutefcc (@cutefcc) #medium #readonly #deep

  ### Question

  Implement a generic DeepMutable<T> which make every parameter of an object - and its sub-objects recursively - mutable.

  For example

  ```ts
  type X = {
    readonly a: () => 1
    readonly b: string
    readonly c: {
      readonly d: boolean
      readonly e: {
        readonly g: {
          readonly h: {
            readonly i: true
            readonly j: "s"
          }
          readonly k: "hello"
        }
      }
    }
  }

  type Expected = {
    a: () => 1
    b: string
    c: {
      d: boolean
      e: {
        g: {
          h: {
            i: true
            j: "s"
          }
          k: "hello"
        }
      }
    }
  }

  type Todo = DeepMutable<X> // should be same as `Expected`
  ```

  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

  > View on GitHub: https://tsch.js.org/17973
*/

/* _____________ Your Code Here _____________ */

type DeepMutable<T extends Record<keyof any, any>> = keyof T extends never
  ? T
  : {
      -readonly [K in keyof T]: DeepMutable<T[K]>;
    };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Test1 {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly meta: {
    readonly author: string;
  };
}
type Test2 = {
  readonly a: () => 1;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: 's';
        };
        readonly k: 'hello';
      };
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey'];
        }
      ];
    };
  };
};
interface DeepMutableTest1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type DeepMutableTest2 = {
  a: () => 1;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: 's';
        };
        k: 'hello';
      };
      l: [
        'hi',
        {
          m: ['hey'];
        }
      ];
    };
  };
};

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>
];

type errors = [
  // @ts-expect-error
  DeepMutable<'string'>,
  // @ts-expect-error
  DeepMutable<0>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた型Tの全てのプロパティに対して読み取り専用 (readonly) プロパティを削除し、各プロパティに再帰的に DeepMutable を適用して、ネストされたオブジェクト内のすべてのプロパティを変更可能なものに変換するための型
 1. Tのキー(プロパティ)が空であるかをチェック
 keyof T extends never ? とすることでTのキーが空であるかチェックし、空であればTをそのまま返す
 Tのキーが空でない場合Tの各プロパティに対してループ処理を行う
 2. プロパティを読み取り専用から変更可能に変換
 { -readonly [K in keyof T]: DeepMutable<T[K]>; }とすることでプロパティからreadonlyを取り除いて変更可能に変換する
 DeepMutable<T[K]>とすることでKの型に再帰的にDeepMutableを適用し、ネストされたオブジェクト内の全てが変更可能なものに変換される。
 */
