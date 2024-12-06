function checkAvailableQuantity(products, name, quantity) {
  const availableQuantity = 0;
  const foundProduct = products.map((product) => product.name === name);
  foundProduct.forEach((product) => (avaliableQuantity += product.quantity));
  return quantity < availableQuantity;
}

export default function validateShoppingCart(input, products) {
  const shoppingCart = [];
  if (!input.startsWith('[') || !input.includes(']') || !input.includes('-'))
    throw new Error('[ERROR] 한개 이상의 뭐시기를 입력하세요.');

  const parseInput = input.split(',');
  console.log(parseInput);
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

      shoppingCart.push([productName, +quantity]);
    });
  else {
    const [productName, quantity] = parseInput[0]
      .slice(1, parseInput[0].length - 1)
      .split('-');

    if (Number.isNaN(Number(quantity)) || Number(quantity) < 0) {
      throw new Error('[ERROR] 포멧이 올바르지 않습니다.');
    }

    shoppingCart.push([productName, +quantity]);
  }
  return shoppingCart;
}
