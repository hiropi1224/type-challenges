/*
  527 - Append to object
  -------
  by Andrey Krasovsky (@bre30kra69cs) #中級 #object-keys

  ### 質問

  インターフェースに新しいフィールドを追加する型を実装します。この型は、3 つの引数を受け取り、新しいフィールドを持つオブジェクトを出力しなければなりません。

  例えば、

  ```ts
  type Test = { id: '1' };
  type Result = AppendToObject<Test, 'value', 4>; // expected to be { id: '1', value: 4 }
  ```

  > GitHubで確認する：https://tsch.js.org/527/ja
*/

/* _____________ ここにコードを記入 _____________ */

type AppendToObject<T extends Record<string, any>, U extends string, V> = {
  [K in keyof T | U]: K extends U ? V : T[K];
};

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type test1 = {
  key: 'cat';
  value: 'green';
};

type testExpect1 = {
  key: 'cat';
  value: 'green';
  home: boolean;
};

type test2 = {
  key: 'dog' | undefined;
  value: 'white';
  sun: true;
};

type testExpect2 = {
  key: 'dog' | undefined;
  value: 'white';
  sun: true;
  home: 1;
};

type test3 = {
  key: 'cow';
  value: 'yellow';
  sun: false;
};

type testExpect3 = {
  key: 'cow';
  value: 'yellow';
  sun: false;
  moon: false | undefined;
};

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>
];

/* _____________ 解説 _____________ */
/*
 1. Tに対してRecord<string, any>と制約をつける
 Record<string, any>は任意の文字列キーと任意の値のペアを持つオブジェクト型である。
 2. Uに対してstringと制約を付ける
 Uは新しいフィールドの名前を表すため文字列型に制約を付ける
 3. 新しいオブジェクトを作成する
 オブジェクトのキーはすでにあるものと受け取ったUになるため[K in keyof T | U]となる。
 値は受け取ったUに一致するのであればVを、そうでなければ既存のオブジェクトの値であるT[K]を返す
*/
