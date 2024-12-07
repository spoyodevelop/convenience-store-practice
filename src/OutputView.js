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
  printListProduct(listofProduct) {
    Console.print('==============W 편의점================');
    Console.print('상품명 수량 금액');
    listofProduct.forEach(({ shoppingName, quantity, price }) => {
      Console.print(`${shoppingName}   ${quantity}   ${price}`);
    });
  },
  printFreebieProduct(listOfFreebieProduct) {
    Console.print('=============증 정===============');

    listOfFreebieProduct.forEach(({ shoppingName, freebie }) => {
      Console.print(`${shoppingName}  ${freebie}`);
    });
  },
  printTotal({
    totalProductPrice,
    totalDiscountPrice,
    totalQuantity,
    membershipDiscount,
  }) {
    Console.print('====================================');
    Console.print(
      `총구매액   ${totalQuantity} ${this.toNumberFormatOfKor(totalProductPrice)}`,
    );
    Console.print(
      `행사할인   ${totalQuantity} -${this.toNumberFormatOfKor(totalDiscountPrice)}`,
    );
    Console.print(
      `멤버십할인   ${this.toNumberFormatOfKor(membershipDiscount)}`,
    );
    Console.print(
      `내실돈  ${this.toNumberFormatOfKor(totalProductPrice - totalDiscountPrice - membershipDiscount)}`,
    );
  },
};
export default OutputView;
