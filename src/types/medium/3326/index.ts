/*
  3326 - BEM style string
  -------
  by Songhn (@songhn233) #medium #template-literal #union #tuple

  ### Question

  The Block, Element, Modifier methodology (BEM) is a popular naming convention for classes in CSS.

  For example, the block component would be represented as `btn`, element that depends upon the block would be represented as `btn__price`, modifier that changes the style of the block would be represented as `btn--big` or `btn__price--warning`.

  Implement `BEM<B, E, M>` which generate string union from these three parameters. Where `B` is a string literal, `E` and `M` are string arrays (can be empty).

  > View on GitHub: https://tsch.js.org/3326
*/

/* _____________ Your Code Here _____________ */

type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${B}${E extends []
  ? ''
  : { [K in keyof E]: `__${E[K]}` }[number]}${M extends []
  ? ''
  : { [K in keyof M]: `--${M[K]}` }[number]}`;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<
    Equal<
      BEM<'btn', ['price'], ['warning', 'success']>,
      'btn__price--warning' | 'btn__price--success'
    >
  >,
  Expect<
    Equal<
      BEM<'btn', [], ['small', 'medium', 'large']>,
      'btn--small' | 'btn--medium' | 'btn--large'
    >
  >
];

/* _____________ 解説 _____________ */
/*
 1. ブロック名Bをクラスの先頭に追加
 `${B}`でブロック名Bを先頭に追加する
 2. 要素名の配列Eが空であれば何もせず、それ以外の場合は各要素に__を付けてクラス名を生成
 {E extends [] ? '' : { [K in keyof E]: `__${E[K]}` }[number]}とすることでEの要素がある場合に__を付けたクラス名を生成する
 3. モディファイア名の配列Mが空であれば何もせず、それ以外の場合は各要素に--を付けてクラス名を生成
 {M extends [] ? '' : { [K in keyof M]: `__${M[K]}` }[number]}とすることでEの要素がある場合に__を付けたクラス名を生成する
 */
