import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  toNumberFormatOfKor(num) {
    return num.toLocaleString('ko-KR');
  },

  printMessage(message) {
    Console.print(message);
  },

  printProducts(products) {
    products.forEach((product) => Console.print(product.toString()));
  },
};
export default OutputView;
