import { Console } from '@woowacourse/mission-utils';
import validateShoppingCart from './Validator/validateShoppingCart.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
    );
  },
  async getValidShoppingCart(products) {
    while (true) {
      const input = await Console.readLineAsync(
        '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])',
      );
      let shoppingCart;
      try {
        shoppingCart = validateShoppingCart(input, products);
      } catch (error) {
        Console.print(error.message);
        continue;
      }

      if (shoppingCart !== null) {
        return shoppingCart; // 유효한 입력일 경우 반환
      }
    }
  },

  async getYesOrNoAnswer(message) {
    while (true) {
      const input = await Console.readLineAsync(message);
      if (input.toUpperCase() === 'Y') return true;
      if (input.toUpperCase() === 'N') {
        return false;
      }
    }
  },
};
export default InputView;
