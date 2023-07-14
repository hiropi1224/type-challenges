/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #中級 #template-literal

  ### 質問

  `String#length` と同じように、文字列リテラルの長さを計算します。

  > GitHubで確認する：https://tsch.js.org/298/ja
*/

/* _____________ ここにコードを記入 _____________ */

type ToArray<S extends string> = S extends `${infer A}${infer B}`
  ? [A, ...ToArray<B>]
  : [];
type LengthOfString<S extends string> = ToArray<S>['length'];

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
];

/* _____________ 解説 _____________ */
/*
 1. 与えられた文字列を配列に変換する型を定義する
 ToArray<S extends string>型を定義し、文字列を配列に変換する。
 1-1 S extends `${infer A}${infer B}`で文字列Sを2つに分解する
 Aは最初の文字、Bは残りの文字を表す
 1-2 ? [A, ...ToArray<B>] : []で文字列が空かどうか判定
 文字列が空でなければAを配列に追加し、残りの文字列を再帰的にToArray型に変換する。
 文字列が空であれば空の配列を返す
 2. LengthOfStringで受け取った文字列に対してToArrayを使う
 ToArrayを使うことで文字列を配列に変換し、その配列に対して['length']とすることで文字列の長さを取得できる。
*/
