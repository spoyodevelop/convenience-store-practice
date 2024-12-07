import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  toNumberFormatOfKor(num) {
    return num.toLocaleString('ko-KR');
  },

  printMessage(message) {
    Console.print(message);
  },

  printProducts(products) {
    Console.print('안녕하세요. W편의점입니다.');
    Console.print('현재 보유하고 있는 상품입니다.');

    products.forEach((product) => Console.print(product.toString()));
  },
  printListProduct(listofProduct) {
    Console.print('==============W 편의점================');
    Console.print('상품명 수량 금액');
    listofProduct.forEach(({ shoppingName, quantity, price }) => {
      Console.print(
        `${shoppingName}   ${quantity}  ${this.toNumberFormatOfKor(price)}`,
      );
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
      `총구매액   ${totalQuantity}   ${this.toNumberFormatOfKor(totalProductPrice)}`,
    );
    Console.print(
      `행사할인     -${this.toNumberFormatOfKor(totalDiscountPrice)}`,
    );
    Console.print(
      `멤버십할인   -${this.toNumberFormatOfKor(membershipDiscount)}`,
    );
    Console.print(
      `내실돈  ${this.toNumberFormatOfKor(totalProductPrice - totalDiscountPrice - membershipDiscount)}`,
    );
  },
};
export default OutputView;
