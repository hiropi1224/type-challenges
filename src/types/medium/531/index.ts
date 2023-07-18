/*
  531 - String to Union
  -------
  by Andrey Krasovsky (@bre30kra69cs) #中級 #union #string

  ### 質問

  受け取った文字列を Union 型に変換する型を実装します。

  例えば

  ```ts
  type Test = '123';
  type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
  ```

  > GitHubで確認する：https://tsch.js.org/531/ja
*/

/* _____________ ここにコードを記入 _____________ */

type StringToUnion<T extends string> = `${T}` extends `${infer L}${infer R}`
  ? L | StringToUnion<R>
  : never;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<
    Equal<
      StringToUnion<'coronavirus'>,
      'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'
    >
  >
];

/* _____________ 解説 _____________ */
/*
 1. Tの型をstring型に制約する
 2. Tを最初の文字Lと残りの文字Rに分割する
  `${T}` extends `${infer L}${infer R}`とすることでTを最初の文字と残りの文字に分割する
 3. Conditional Typesを使って`${T}`が`${S}${R}`にマッチするかチェックする
 `${S}${R}`にマッチすればSを返すか再帰的にStringToUnionを呼び出し、マッチしなければneverを返す
 */
