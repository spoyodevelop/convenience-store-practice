import Promotion from './Promotion.js';

class Product {
  #name;

  #price;

  #quantity;

  #promotion;

  constructor(name, price, quantity, promotion) {
    this.#name = name;
    this.#price = +price;
    this.#quantity = +quantity;
    this.#promotion = new Promotion(promotion);
  }

  sellProduct(quantity) {
    this.#quantity -= quantity;
  }

  #toNumberFormatOfKor(num) {
    return num.toLocaleString('ko-KR');
  }

  get promotionQuantity() {
    return this.#promotion.buy;
  }

  get name() {
    return this.#name;
  }

  isWithinDate(date) {
    return this.#promotion.isWithinDate(date);
  }

  getFreebieAmount(amount) {
    return this.#promotion.getFreebieAmount(amount);
  }

  getRemainderAmount(amount) {
    return this.#promotion.getRemainder(amount);
  }

  get promotion() {
    return this.#promotion.name;
  }

  get quantity() {
    return this.#quantity;
  }

  get buyNumber() {
    return this.#promotion.buy;
  }

  get price() {
    return this.#price;
  }

  toString() {
    let displayQuantity = `${this.#quantity}개`;
    let displayPromo = this.#promotion.name;
    if (this.#quantity === 0) displayQuantity = '재고 없음';
    if (displayPromo === 'noPromo') displayPromo = '';

    return `- ${this.#name} ${this.#toNumberFormatOfKor(this.#price)}원 ${displayQuantity} ${displayPromo}`;
  }
}
export default Product;
