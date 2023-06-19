/*
  3057 - Push
  -------
  by jiangshan (@jiangshanmeta) #初級 #array

  ### 質問

  ```Array.push```のジェネリックバージョンを実装します。

  例えば：

  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```

  > GitHubで確認する：https://tsch.js.org/3057/ja
*/

/* _____________ ここにコードを記入 _____________ */

type Push<T extends unknown[], U> = [...T, U];

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>
];

/* _____________ 解説 _____________ */
/*
 既存配列型に受け取った値を追加すればよい。
 Tは配列型のためextends unknown[]とし、[...T, U]とする。
*/
