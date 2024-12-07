function listEachItem(listOfItemBought) {
  return listOfItemBought.map(
    ({
      shoppingName,
      promoSellQuantity,
      nonPromoSellQuantity,
      price,
      freebie,
    }) => ({
      shoppingName,
      quantity: promoSellQuantity + nonPromoSellQuantity,
      price: price * (promoSellQuantity + nonPromoSellQuantity),
    }),
  );
}

function listFreebieItem(listOfItemBought) {
  const itemWithFreebie = listOfItemBought.filter(({ freebie }) => freebie > 0);
  return itemWithFreebie.map(
    ({
      shoppingName,
      promoSellQuantity,
      nonPromoSellQuantity,
      price,
      freebie,
    }) => ({
      shoppingName,
      freebie,
    }),
  );
}

function calculateBill(listOfItemBought, membership) {
  let totalProductPrice = 0;
  let totalDiscountPrice = 0;
  let totalQuantity = 0;
  let membershipDiscount = 0;

  listOfItemBought.forEach(
    ({
      shoppingName,
      promoSellQuantity,
      nonPromoSellQuantity,
      price,
      freebie,
      remainer,
    }) => {
      totalQuantity += promoSellQuantity + nonPromoSellQuantity;
      totalProductPrice += (promoSellQuantity + nonPromoSellQuantity) * price;
      totalDiscountPrice += freebie * price;
      const membershipDiscountable = nonPromoSellQuantity + remainer;
      // console.log(shoppingName, nonPromoSellQuantity, remainer);
      membershipDiscount += membershipDiscountable * price * 0.3;
    },
  );
  membershipDiscount = Math.min(8000, membershipDiscount);
  if (!membership) {
    membershipDiscount = 0;
  }

  return {
    totalProductPrice,
    totalDiscountPrice,
    totalQuantity,
    membershipDiscount,
  };
}

export { listEachItem, listFreebieItem, calculateBill };
