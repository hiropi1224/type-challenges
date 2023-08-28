/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  takes an Array ```T```, any ```U``` and returns the index of the last ```U``` in Array ```T```

  For example:

  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```

  > View on GitHub: https://tsch.js.org/5317
*/

/* _____________ Your Code Here _____________ */

type LastIndexOf<T, U> = T extends [...infer F, infer R]
  ? Equal<R, U> extends true
    ? F['length']
    : LastIndexOf<F, U>
  : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>
];

/* _____________ 解説 _____________ */
/*
 この型定義は、与えられた配列Tにおいて、要素Uの最後の出現位置（インデックス）を見つけるための型
 1. 配列を最後の要素と残りの要素に分割
 T extends [...infer F, infer R]として配列を分解し、Uと比較する。
 2. 最後の要素と受け取ったUを比較
 Equal<R, U>で比較し、一致すればFの長さを、一致しなければ残りの要素に対してLastIndexOfを適用する
 3. 最後の要素まで一致するものが見つからなければ-1を返す
 */
