import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  toNumberFormatOfKor(num) {
    return num.toLocaleString('ko-KR');
  },

  printMessage(message) {
    Console.print(message);
  },
};
export default OutputView;
