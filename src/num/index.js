// withinErrorMargin(0.1 + 0.2, 0.3) 
function withinErrorMargin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

// check the number is power of 2
const isNumberPowerOfTwo = number => !!number && (number & (number - 1)) === 0;

// 数字格式化 3000 -> 3,000
function formatNumber(str) {
  return ('' + str).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // number [number].toLocaleString('en-US')
}

// 非大数取整
function intNumber(num) {
  return ~~num
  //  num|0
}

export default {
  withinErrorMargin,
  isNumberPowerOfTwo,
  formatNumber,
  intNumber
}