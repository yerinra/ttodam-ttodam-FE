const priceFormat = new Intl.NumberFormat('ko-KR', {
  style: 'decimal',
  maximumFractionDigits: 0,
});

export const toPriceFormat = (value: number) => priceFormat.format(value);