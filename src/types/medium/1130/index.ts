/*
  1130 - ReplaceKeys
  -------
  by 贱贱 (@lullabyjune) #medium #object-keys

  ### Question

  Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing,
  A type takes three arguments.

  For example:

  ```ts
  type NodeA = {
    type: "A"
    name: string
    flag: number
  }

  type NodeB = {
    type: "B"
    id: number
    flag: number
  }

  type NodeC = {
    type: "C"
    name: string
    flag: number
  }

  type Nodes = NodeA | NodeB | NodeC

  type ReplacedNodes = ReplaceKeys<
    Nodes,
    "name" | "flag",
    { name: number; flag: string }
  > // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

  type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
  ```

  > View on GitHub: https://tsch.js.org/1130
*/

/* _____________ Your Code Here _____________ */

type ReplaceKeys<U extends object, T extends string, Y extends object> = {
  [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type NodeA = {
  type: 'A';
  name: string;
  flag: number;
};

type NodeB = {
  type: 'B';
  id: number;
  flag: number;
};

type NodeC = {
  type: 'C';
  name: string;
  flag: number;
};

type ReplacedNodeA = {
  type: 'A';
  name: number;
  flag: string;
};

type ReplacedNodeB = {
  type: 'B';
  id: number;
  flag: string;
};

type ReplacedNodeC = {
  type: 'C';
  name: number;
  flag: string;
};

type NoNameNodeA = {
  type: 'A';
  flag: number;
  name: never;
};

type NoNameNodeC = {
  type: 'C';
  flag: number;
  name: never;
};

type Nodes = NodeA | NodeB | NodeC;
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC;
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB;

type cases = [
  Expect<
    Equal<
      ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>,
      ReplacedNodes
    >
  >,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>
];

/* _____________ 解説 _____________ */
/*
 1. ReplaceKeysが受け取るU、T、Yに対してそれぞれ制約を付ける
 U、Yはobject、Tはstringとする
 2. オブジェクトのキーを設定する
 生成するオブジェクトのキーは受け取ったUと同じ形となるため[K in keyof U]となる
 3. Conditional Typesを使ってオブジェクトの値を設定する
 オブジェクトのキーが受け取ったstring型のTとマッチする場合は値を書き換える必要があるため K extends T ? ... : U[K]のような条件となる
 4. K extends T にマッチする場合、Kが書き換え対象であるYのキーに含まれるかチェックし、含まれる場合はY[K]を、含まれない場合はnever型を返す
 5. K extends T にマッチしない場合はU[K]を返す
*/
