import { DateTimes } from '@woowacourse/mission-utils';
import InputView from './InputView.js';

function checkProductAvailable(products, name) {
  const noPromo = products.find(
    (product) => product.name === name && product.promotion === 'noPromo',
  );
  const promo = products.find(
    (product) => product.name === name && product.promotion !== 'noPromo',
  );
  return [promo, noPromo];
}
async function sellProductNotExpired(products, shoppingItem) {
  const [shoppingName, quantity] = shoppingItem;

  const [promo, nonPromo] = checkProductAvailable(products, shoppingName);

  const promoProductQuantity = promo?.quantity ?? 0;

  //   const nonPromoProductQuantity = nonPromo?.quantity ?? 0;

  let promoSellQuantity = Math.min(promoProductQuantity, quantity);
  let nonPromoSellQuantity = quantity - promoSellQuantity;

  let remainer = nonPromoSellQuantity;

  if (
    promo &&
    promoProductQuantity > promoSellQuantity + 1 &&
    promo.getRemainderAmount(promoSellQuantity) + 1 === promo.buyNumber
  ) {
    const userAgree = await InputView.getYesOrNoAnswer(
      `현재 ${shoppingName}은(는) 1개를 무료로 더 받을수 있습니다. 추가하시겠습니까? (Y/N)`,
    );
    if (userAgree) {
      promoSellQuantity += 1;
    }
  }
  if (promoSellQuantity > 0) {
    remainer += promo.getRemainderAmount(promoSellQuantity);
  }
  if (promo && remainer + nonPromoSellQuantity >= promo.promotionQuantity) {
    const userAgree = await InputView.getYesOrNoAnswer(
      `현재 ${shoppingName} ${remainer}개는 프로모션 할인이 적용되지않습니다. 그래도 구매하시겠습니까?`,
    );
    if (!userAgree) {
      promoSellQuantity -= promo.getRemainderAmount(promoSellQuantity);
      nonPromoSellQuantity = 0;
    }
  }

  if (promoSellQuantity > 0) {
    promo.sellProduct(promoSellQuantity);
  }
  if (nonPromoSellQuantity > 0) {
    nonPromo.sellProduct(nonPromoSellQuantity);
  }
  let freebie = 0;
  if (promo) {
    freebie = promo.getFreebieAmount(promoSellQuantity);
  }
  // remainer를 잘 계산해볼것
  if (remainer - nonPromoSellQuantity < 0) {
    remainer = 0;
  }
  return {
    shoppingName,
    promoSellQuantity,
    nonPromoSellQuantity,
    remainer: remainer - nonPromoSellQuantity,
    price: nonPromo.price,
    freebie,
  };
}
function sellExpiredProduct(products, shoppingItem) {
  const [shoppingName, quantity] = shoppingItem;

  const [promo, nonPromo] = checkProductAvailable(products, shoppingName);

  const promoProductQuantity = promo?.quantity ?? 0;

  //   const nonPromoProductQuantity = nonPromo?.quantity ?? 0;

  const promoSellQuantity = Math.min(promoProductQuantity, quantity);
  const nonPromoSellQuantity = quantity - promoSellQuantity;

  const remainer = 0;

  if (promoSellQuantity > 0) {
    promo.sellProduct(promoSellQuantity);
  }
  if (nonPromoSellQuantity > 0) {
    nonPromo.sellProduct(nonPromoSellQuantity);
  }
  const freebie = 0;
  return {
    shoppingName,
    promoSellQuantity,
    nonPromoSellQuantity,
    remainer,
    price: nonPromo.price,
    freebie,
  };
}
export default async function sellProduct(products, shoppingItem) {
  const [shoppingName, quantity] = shoppingItem;
  const [promo, nonPromo] = checkProductAvailable(products, shoppingName);

  if (promo && promo.isWithinDate(DateTimes.now())) {
    const saleData = await sellProductNotExpired(products, shoppingItem);
    console.log(saleData);
    return saleData;
  }
  return sellExpiredProduct(products, shoppingItem);
}
