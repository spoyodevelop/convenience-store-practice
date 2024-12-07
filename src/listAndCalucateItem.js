function listEachItem(listOfItemBought) {
  return listOfItemBought.map(({ shoppingName, quantity, price, freebie }) => {
    return { shoppingName, quantity, price };
  });
}

function listFreebieItem(listOfItemBought) {
  return listOfItemBought.map(({ shoppingName, _, _, freebie }) => ({
    shoppingName,
    freebie,
  }));
}

function calculateBill(listOfItemBought) {
  let totalProductPrice = 0;
  let totalDiscountPrice = 0;
  let totalQuantity = 0;

  listOfItemBought.forEach(({ shoppingName, quantity, price, freebie }) => {
    totalQuantity += quantity;
    totalProductPrice += quantity * price;
    totalDiscountPrice += freebie * price;
  });

  return { totalProductPrice, totalDiscountPrice, totalQuantity };
}
