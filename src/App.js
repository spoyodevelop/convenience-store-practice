import readCSV from './csvParser.js';
import Product from './Model/Product.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import sellProduct from './productSeller.js';
import calculateBill from './billMaker.js';

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
      const shoppingItems = await InputView.getValidShoppingCart(products);
      const listOfItemBought = [];
      for (const shoppingItem of shoppingItems) {
        listOfItemBought.push(await sellProduct(products, shoppingItem));
      }
      calculateBill(listOfItemBought);
      products.forEach((product) => console.log(product.toString()));
    }
  }
}

export default App;
