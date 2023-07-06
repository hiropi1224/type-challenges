/*
  62 - Type Lookup
  -------
  by Anthony Fu (@antfu) #中級 #union #map

  ### 質問

  Union 型から特定の型を属性を使って取得したいことがあります。

  この課題では、`Cat | Dog` という Union 型に共通する `type` というフィールドを使って、対応する型を取得します。つまり、以下の例のように、 `LookUp<Dog | Cat, 'dog'>` の場合は `Dog` を、`LookUp<Dog | Cat, 'cat'>` の場合は `Cat` を取得することになります。

  ```ts
  interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }

  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }

  type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
  ```

  > GitHubで確認する：https://tsch.js.org/62/ja
*/

/* _____________ ここにコードを記入 _____________ */

type LookUp<U, T> = U extends { type: T } ? U : never;

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type Animal = Cat | Dog;

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>
];

/* _____________ 解説 _____________ */
/*
 1. LookUpは2つの型引数Union型のU、typeの値であるTを受け取る。
 2. U extends { type: T }とすることでUのtypeの値とTがマッチするか判定し、マッチしていればUを、そうでなければneverを返す
*/
