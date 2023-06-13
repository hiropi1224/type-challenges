/*
  18 - Length of Tuple
  -------
  by sinoon (@sinoon) #初級 #tuple

  ### 質問

  タプル`T`を受け取り、そのタプルの長さを返す型`Length<T>`を実装します。

  例えば：

  ```ts
  type tesla = ['tesla', 'model 3', 'model X', 'model Y']
  type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

  type teslaLength = Length<tesla>  // expected 4
  type spaceXLength = Length<spaceX> // expected 5
  ```

  > GitHubで確認する：https://tsch.js.org/18/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Length<T extends readonly any[]> = T['length'];

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT',
] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>
];

/* _____________ 解説 _____________ */
/*
 配列の要素数を返す型を生成するため、type Lengthはany[]を継承する。
 このとき、<T extends any[]>だと、readonlyな配列を受け取るとエラーが発生するため<T extends readonly any[]>とする。
*/
