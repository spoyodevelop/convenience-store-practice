function checkProductAvailable(products, name) {
  const noPromo = products.find(
    (product) => product.name === name && product.promotion === 'noPromo',
  );
  const promo = products.find(
    (product) => product.name === name && product.promotion !== 'noPromo',
  );
  return [promo, noPromo];
}
export default function sellProduct(products, shoppingItem) {
  const [shoppingName, quantity] = shoppingItem;

  const [promo, nonPromo] = checkProductAvailable(products, shoppingName);

  const promoProductQuantity = promo?.quantity ?? 0;
  const nonPromoProductQuantity = nonPromo?.quantity ?? 0;

  const promoSellQuantity = Math.min(promoProductQuantity, quantity);
  const nonPromoSellQuantity = quantity - promoSellQuantity;

  let remainer = nonPromoSellQuantity;

  if (promoSellQuantity > 0) {
    remainer += promo.getRemainderAmount(promoSellQuantity);
  }
  if (promoSellQuantity > 0) {
    promo.sellProduct(promoSellQuantity);
  }
  if (nonPromoSellQuantity > 0) {
    nonPromo.sellProduct(nonPromoSellQuantity);
  }
}
