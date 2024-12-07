import readCSV from '../csvParser.js';

const promotionCSV = readCSV('public/promotions.md');

function findPromotion(promotions, name) {
  return promotions.find((promotion) => promotion[0] === name);
}
class Promotion {
  #name;

  #buy;

  #get;

  #startDate;

  #endDate;

  constructor(name) {
    if (name === null || name === 'null') {
      this.#name = 'noPromo';
      return;
    }
    const [promoName, buy, get, startDate, endDate] = findPromotion(
      promotionCSV,
      name,
    );
    this.#name = promoName;
    this.#buy = +buy;
    this.#get = +get;
    this.#startDate = new Date(startDate);
    this.#endDate = new Date(endDate);
  }

  get name() {
    return this.#name;
  }

  getFreebieAmount(amount) {
    return Math.floor(amount / (this.#buy + 1)) * this.#get;
  }

  get buy() {
    return this.#buy + 1;
  }

  getRemainder(amount) {
    return amount % (this.#buy + 1);
  }

  isWithinDate(date) {
    return this.#startDate <= date && this.#endDate >= date;
  }

  toString() {
    return `${this.#name} ${this.#buy} ${this.#get} ${this.#startDate}`;
  }
}
export default Promotion;
