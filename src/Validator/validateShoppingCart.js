function checkAvailableQuantity(products, name, quantity) {
  let availableQuantity = 0;
  const foundProduct = products.filter((product) => product.name === name);

  foundProduct.forEach((product) => (availableQuantity += +product.quantity));
  return availableQuantity >= quantity;
}
function checkProductAvaliable(products, name) {
  const foundProduct = products.filter((product) => product.name === name);
  return foundProduct.length > 0;
}
export default function validateShoppingCart(input, products) {
  const shoppingCart = [];
  if (!input.startsWith('[') || !input.includes(']') || !input.includes('-'))
    throw new Error('[ERROR] 한개 이상의 뭐시기를 입력하세요.');

  const parseInput = input.split(',');

  if (parseInput.length > 1)
    parseInput.forEach((parsedInput) => {
      if (
        !parsedInput.startsWith('[') ||
        !parsedInput.includes(']') ||
        !parsedInput.includes('-')
      )
        throw new Error('[ERROR] 한개 이상의 뭐시기를 입력하세요.');
      const [productName, quantity] = parsedInput
        .slice(1, parsedInput.length - 1)
        .split('-');

      if (Number.isNaN(Number(quantity)) || Number(quantity) < 0) {
        throw new Error('[ERROR] 포멧이 올바르지 않습니다. ');
      }
      if (!checkProductAvaliable(products, productName))
        throw new Error('[ERROR] 물건이 존재하지 않습니다.');
      if (!checkAvailableQuantity(products, productName, quantity))
        throw new Error(
          '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
        );

      shoppingCart.push([productName, +quantity]);
    });
  else {
    const [productName, quantity] = parseInput[0]
      .slice(1, parseInput[0].length - 1)
      .split('-');

    if (Number.isNaN(Number(quantity)) || Number(quantity) < 0) {
      throw new Error('[ERROR] 포멧이 올바르지 않습니다.');
    }
    if (!checkProductAvaliable(products, productName))
      throw new Error('[ERROR] 물건이 존재하지 않습니다.');
    if (!checkAvailableQuantity(products, productName, quantity))
      throw new Error(
        '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
      );

    shoppingCart.push([productName, +quantity]);
  }
  return shoppingCart;
}
