export const formatVND = (amount: number): string => {
  if (isNaN(amount) || amount === undefined || amount === null) return '0 ₫';
  const rounded = Math.round(amount);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫';
};

export const formatPrice = formatVND;
