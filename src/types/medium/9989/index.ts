/*
  9989 - Count Element Number To Object
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:

  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  // return {
  //   1: 1,
  //   2: 1,
  //   3: 1,
  //   4: 1,
  //   5: 1
  // }

  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  // return {
  //   1: 2,
  //   2: 2,
  //   3: 2,
  //   4: 1,
  //   5: 1
  // }
  ~~~

  > View on GitHub: https://tsch.js.org/9989
*/

/* _____________ Your Code Here _____________ */

type TupleElementNumberToObject<
  T,
  O extends Record<PropertyKey, any[]> = {}
> = T extends [infer F, ...infer R]
  ? TupleElementNumberToObject<
      R,
      [F] extends [PropertyKey]
        ? Omit<O, F> & { [K in F]: K extends keyof O ? [...O[K], F] : [F] }
        : TupleElementNumberToObject<F, O>
    >
  : O;

type CountElementNumberToObject<
  T,
  O extends Record<PropertyKey, any[]> = TupleElementNumberToObject<T>
> = {
  [K in keyof O]: O[K]['length'];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<['1', '2', '0']>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<['a', 'b', ['c', ['d']]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >
];

/* _____________ 解説 _____________ */
/*
 TupleElementNumberToObjectは、タプル（配列型）内の要素の数を数え、それらの要素をオブジェクトにマッピングするための型
 1. 配列Tを最初の要素と残りの要素に分割
 2. Fがオブジェクトのキーとして有効かチェック
 [F] extends [PropertyKey]とすることで、Fがオブジェクトのキーとして有効かチェックし、有効な値であればFを持つオブジェクトを生成し、そうでなければTupleElementNumberToObjectを再帰的に呼び出す。
 3. Fを持つオブジェクトを生成
 Omit<O, F> & { [K in F]: K extends keyof O ? [...O[K], F] : [F] }としてオブジェクトを生成する。
 オブジェクトOからキーFを削除し、キーFを持つプロパティを生成する。
 
 CountElementNumberToObjectは、TupleElementNumberToObjectによって生成されたオブジェクトを受け取り、各プロパティ内の要素数を数えるための型
 各プロパティの要素の配列の長さを計算
 { [K in keyof O]: O[K]['length'] }とすることで各プロパティに対してその値の長さを計算してオブジェクトとして返す
 各プロパティはその要素の数を表す。
 */
