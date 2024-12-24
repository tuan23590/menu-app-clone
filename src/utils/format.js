
export function formatMoney(amount, currency = 'VND') {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  })
    .format(amount)
    .replace(/\s/, '')
}