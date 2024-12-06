import readCSV from './csvParser.js';
import Product from './Model/Product.js';
import InputView from './InputView.js';
import OutputView from './OutputView.js';

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
    const input = await InputView.getValidShoppingCart();
    function checkAvailableQuantity(products, name, quantity) {
      const availableQuantity = 0;
      const foundProduct = products.map((product) => product.name === name);
      foundProduct.forEach(
        (product) => (avaliableQuantity += product.quantity),
      );
      return availableQuantity;
    }

    checkAvailableQuantity(products);
  }
}

export default App;
