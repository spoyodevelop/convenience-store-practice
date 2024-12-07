import readCSV from './csvParser.js';
import Product from './Model/Product.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import sellProduct from './productSeller.js';

import {
  listEachItem,
  listFreebieItem,
  calculateBill,
} from './listAndCalculateItem.js';

class App {
  async run() {
    const productCSV = await readCSV('public/products.md');
    const products = [];

    const promoItems = productCSV.map(([name, price, quantity, promotion]) => {
      if (promotion !== 'null') return name;
    });

    const nonPromoItems = productCSV.map(
      ([name, price, quantity, promotion]) => {
        if (promotion === 'null') return name;
      },
    );

    const addableItems = promoItems.filter(
      (item) => !nonPromoItems.includes(item),
    );

    productCSV.forEach(([name, price, quantity, promotion]) => {
      products.push(new Product(name, price, quantity, promotion));
      if (addableItems.includes(name))
        products.push(new Product(name, price, 0, null));
    });

    // const input = await InputView.getYesOrNoAnswer('y/n?');
    while (true) {
      OutputView.printProducts(products);
      const shoppingItems = await InputView.getValidShoppingCart(products);
      const listOfItemBought = [];
      for (const shoppingItem of shoppingItems) {
        listOfItemBought.push(await sellProduct(products, shoppingItem));
      }
      const membership = await InputView.getYesOrNoAnswer(
        '멤버십 할인을 받으시겠습니까? (Y/N)',
      );

      const boughtProductList = listEachItem(listOfItemBought);
      const freebieList = listFreebieItem(listOfItemBought);
      const totalBill = calculateBill(listOfItemBought, membership);

      OutputView.printListProduct(boughtProductList);
      OutputView.printFreebieProduct(freebieList);
      OutputView.printTotal(totalBill);

      const moreSale = await InputView.getYesOrNoAnswer(
        '감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)',
      );

      if (!moreSale) break;
    }
  }
}

export default App;
