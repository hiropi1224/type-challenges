/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #初級 #promise #built-in

  ### 質問

  Promise ライクな型が内包する型をどのように取得すればよいでしょうか。

  例えば：`Promise<ExampleType>`という型がある場合、どのようにして ExampleType を取得すればよいでしょうか。

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > この問題の元記事は [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora) です。

  > GitHubで確認する：https://tsch.js.org/189/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
  ? U extends Promise<any>
    ? MyAwaited<U>
    : U
  : never;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

/* _____________ 解説 _____________ */
/*
 T extends PromiseLike<any>はTがPromiseLike<any>の派生型であることを表しているため、
 TはPromiseまたはPromiseに似たオブジェクトである必要がある。
 TがPromiseLike<infer U>と互換性がある場合はUを取り出してさらに条件分岐を行う。
 UがPromise<any>と互換性がある場合、MyAwaited<U>が再帰的に適用されるため、UがPromiseオブジェクトでなくなるまで続く。
 UがPromise<any>と互換性がない場合、UがMyAwaitedの結果となる。
 TがPromiseLike<any>と互換性がない場合、neverが返される。
*/
