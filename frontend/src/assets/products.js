const products = Array.from({ length: 45 }, (_, i) => {
  const isEven = i % 2 === 0;

  return {
    title: isEven ? 'סלרי' : 'מלפפון',
    image: isEven
      ? '/images/lettuce.jpeg'
      : '/images/tomato.webp',
    price: isEven ? 6 + (i % 3) : 8.9 - (i % 3),
    ...(isEven
      ? { badge: 'במבצע 3 ב-12 ₪' }
      : { unit: 'ק"ג' }),
  };
});

export default products;
