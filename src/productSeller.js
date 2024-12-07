function checkProductAvailable(products, name) {
  const noPromo = products.filter(
    (product) => product.name === name && product.promotion === 'noPromo',
  );
  const promo = products.filter(
    (product) => product.name === name && product.promotion !== 'noPromo',
  );
  return [promo, noPromo];
}
export default function sellProduct(products, shoppingItem) {
  const [shoppingName, quantity] = shoppingItem;

  const [promo, noPromo] = checkProductAvailable(products, shoppingName);
}
