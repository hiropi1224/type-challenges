/*
  25270 - Transpose
  -------
  by Apollo Wayne (@Shinerising) #medium #array #math

  ### Question

  The transpose of a matrix is an operator which flips a matrix over its diagonal; that is, it switches the row and column indices of the matrix A by producing another matrix, often denoted by A<sup>T</sup>.

  ```ts
  type Matrix = Transpose <[[1]]>; // expected to be [[1]]
  type Matrix1 = Transpose <[[1, 2], [3, 4]]>; // expected to be [[1, 3], [2, 4]]
  type Matrix2 = Transpose <[[1, 2, 3], [4, 5, 6]]>; // expected to be [[1, 4], [2, 5], [3, 6]]
  ```

  > View on GitHub: https://tsch.js.org/25270
*/

/* _____________ Your Code Here _____________ */

type Transpose<M extends number[][], F = M['length'] extends 0 ? [] : M[0]> = {
  [X in keyof F]: {
    [Y in keyof M]: X extends keyof M[Y] ? M[Y][X] : never;
  };
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<
    Equal<
      Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    >
  >
];

/* _____________ 解説 _____________ */
/*
 この型定義は、2次元の行列（行と列から成るデータ構造）を入力とし、その行と列を入れ替えた新しい行列を生成する型
 1. 入力された行列の数を調べてFとして保存
 F = M['length'] extends 0 ? [] : M[0]として入力された行列Mの長さを見て空配列でなければ最初の要素をFとして保存する。
 2. 新しい行列の列を反復処理
 [X in keyof F]: {}とすることでFのプロパティキーを列挙する
 3. 元の配列Mの各行を反復処理
 [Y in keyof M]: X extends keyof M[Y] ? M[Y][X] : never; としてX がM[Y]のキーとして存在する場合（つまり、元の行列において該当のセルが存在する場合）、
 新しい行列のセルの値としてM[Y][X]を設定し、存在しない場合はneverを返す。
 */
