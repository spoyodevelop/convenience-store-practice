import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
    );
  },
  async getValidShoppingCart(products) {
    // while (true) {
    //   const input = await Console.readLineAsync(
    //     '주문하실 매뉴와 개수를 알려주세요.',
    //   );
    //   const shoppingCart = validateShoppingCart(input, products);
    //   if (shoppingCart !== null) {
    //     return shoppingCart; // 유효한 입력일 경우 반환
    //   }
    // }
  },
  async getValidDate() {
    //     while (true) {
    //       const input = await Console.readLineAsync('방문하실 날짜를 입력해주세요');
    //       const number = validateDateNumber(input);
    //       if (number) {
    //         return number;
    //       }
    //     }
    //   },
  },
};
export default InputView;
