/*
  26401 - JSON Schema to TypeScript
  -------
  by null (@aswinsvijay) #medium #JSON

  ### Question

  Implement the generic type JSONSchema2TS which will return the TypeScript type corresponding to the given JSON schema.

  Additional challenges to handle:
  * additionalProperties
  * oneOf, anyOf, allOf
  * minLength and maxLength

  > View on GitHub: https://tsch.js.org/26401
*/

/* _____________ Your Code Here _____________ */

type TypeProperty = 'string' | 'number' | 'boolean' | 'object' | 'array';

type Properties = {
  [K in string]?: JSONSchema;
};

type JSONSchema = {
  type: TypeProperty;
  enum?: unknown[];
  items?: JSONSchema;
  properties?: Properties;
  required?: string[];
};

type Primitive = {
  string: string;
  boolean: boolean;
  number: number;
};

type JSONSchema2TS<T extends JSONSchema> = T['enum'] extends any[]
  ? T['enum'][number]
  : T['type'] extends keyof Primitive
  ? Primitive[T['type']]
  : T['type'] extends 'array'
  ? T['items'] extends JSONSchema
    ? JSONSchema2TS<T['items']>[]
    : unknown[]
  : T['type'] extends 'object'
  ? T['properties'] extends Properties
    ? Omit<
        {
          [K in Exclude<
            keyof T['properties'],
            T['required'] extends string[] ? T['required'][number] : never
          >]?: T['properties'][K] extends JSONSchema
            ? JSONSchema2TS<T['properties'][K]>
            : never;
        } & {
          [K in Extract<
            keyof T['properties'],
            T['required'] extends string[] ? T['required'][number] : never
          >]: T['properties'][K] extends JSONSchema
            ? JSONSchema2TS<T['properties'][K]>
            : never;
        },
        never
      >
    : Record<string, unknown>
  : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

// + Primitive types
type Type1 = JSONSchema2TS<{
  type: 'string';
}>;
type Expected1 = string;
type Result1 = Expect<Equal<Type1, Expected1>>;

type Type2 = JSONSchema2TS<{
  type: 'number';
}>;
type Expected2 = number;
type Result2 = Expect<Equal<Type2, Expected2>>;

type Type3 = JSONSchema2TS<{
  type: 'boolean';
}>;
type Expected3 = boolean;
type Result3 = Expect<Equal<Type3, Expected3>>;
// - Primitive types

// + Enums
type Type4 = JSONSchema2TS<{
  type: 'string';
  enum: ['a', 'b', 'c'];
}>;
type Expected4 = 'a' | 'b' | 'c';
type Result4 = Expect<Equal<Type4, Expected4>>;

type Type5 = JSONSchema2TS<{
  type: 'number';
  enum: [1, 2, 3];
}>;
type Expected5 = 1 | 2 | 3;
type Result5 = Expect<Equal<Type5, Expected5>>;
// - Enums

// + Object types
type Type6 = JSONSchema2TS<{
  type: 'object';
}>;
type Expected6 = Record<string, unknown>;
type Result6 = Expect<Equal<Type6, Expected6>>;

type Type7 = JSONSchema2TS<{
  type: 'object';
  properties: {};
}>;
type Expected7 = {};
type Result7 = Expect<Equal<Type7, Expected7>>;

type Type8 = JSONSchema2TS<{
  type: 'object';
  properties: {
    a: {
      type: 'string';
    };
  };
}>;
type Expected8 = {
  a?: string;
};
type Result8 = Expect<Equal<Type8, Expected8>>;
// - Object types

// + Arrays
type Type9 = JSONSchema2TS<{
  type: 'array';
}>;
type Expected9 = unknown[];
type Result9 = Expect<Equal<Type9, Expected9>>;

type Type10 = JSONSchema2TS<{
  type: 'array';
  items: {
    type: 'string';
  };
}>;
type Expected10 = string[];
type Result10 = Expect<Equal<Type10, Expected10>>;

type Type11 = JSONSchema2TS<{
  type: 'array';
  items: {
    type: 'object';
  };
}>;
type Expected11 = Record<string, unknown>[];
type Result11 = Expect<Equal<Type11, Expected11>>;
// - Arrays

// + Mixed types
type Type12 = JSONSchema2TS<{
  type: 'object';
  properties: {
    a: {
      type: 'string';
      enum: ['a', 'b', 'c'];
    };
    b: {
      type: 'number';
    };
  };
}>;
type Expected12 = {
  a?: 'a' | 'b' | 'c';
  b?: number;
};
type Result12 = Expect<Equal<Type12, Expected12>>;

type Type13 = JSONSchema2TS<{
  type: 'array';
  items: {
    type: 'object';
    properties: {
      a: {
        type: 'string';
      };
    };
  };
}>;
type Expected13 = {
  a?: string;
}[];
type Result13 = Expect<Equal<Type13, Expected13>>;
// - Mixed types

// + Required fields
type Type14 = JSONSchema2TS<{
  type: 'object';
  properties: {
    req1: { type: 'string' };
    req2: {
      type: 'object';
      properties: {
        a: {
          type: 'number';
        };
      };
      required: ['a'];
    };
    add1: { type: 'string' };
    add2: {
      type: 'array';
      items: {
        type: 'number';
      };
    };
  };
  required: ['req1', 'req2'];
}>;
type Expected14 = {
  req1: string;
  req2: { a: number };
  add1?: string;
  add2?: number[];
};
type Result14 = Expect<Equal<Type14, Expected14>>;
// - Required fields

/* _____________ 解説 _____________ */
/*
 この型定義は、JSONスキーマをTypeScriptの型に変換する型
 1. 許容されるプリミティブ型を定義
 TypePropertyで文字列、数値、真偽値、オブジェクト、配列の型を文字列リテラルで列挙する。
 2. JSONスキーマのプロパティ型を定義
 [K in string]?: JSONSchemaという形でJSONスキーマのプロパティ型を定義する。
 3. JSONスキーマを表現する型を定義
 type: データ型を表す文字列。例えば、string、number、boolean、object、arrayなど。
 enum: オプション。許容される値を格納する配列。
 items: オプション。配列型の場合、配列要素のスキーマを表す JSONSchema 型。
 properties: オプション。オブジェクト型の場合、プロパティとそれに対応するスキーマを表すProperties型。
 required: オプション。必須のプロパティ名を格納する文字列の配列。
 4. プリミティブデータ型を実際のTypeScript型にマップするための型を定義
 string、number、booleanそれぞれに対応する型を定義する。
 5. JSONスキーマからTypeScriptに変換する型を定義
 enumプロパティがある場合、そのenum配列の要素の型を取得します。
 typeプロパティがプリミティブ型のキーにマップされている場合、対応するTypeScriptプリミティブ型を取得します。
 typeプロパティが"array"の場合、itemsプロパティのスキーマを再帰的に処理してTypeScriptの配列型を生成します。
 typeプロパティが"object"の場合、propertiesプロパティのスキーマを再帰的に処理してTypeScriptのオブジェクト型を生成します。また、requiredプロパティに基づいて必須のプロパティを指定します。
 */
