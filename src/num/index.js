// withinErrorMargin(0.1 + 0.2, 0.3)
function withinErrorMargin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

// check the number is power of 2
const isNumberPowerOfTwo = (number) =>
  !!number && (number & (number - 1)) === 0;

// 数字格式化 3000 -> 3,000
function formatNumber(str) {
  return ("" + str).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // number [number].toLocaleString('en-US')
}

// {number} number：要格式化的数字
// {number} decimals：保留几位小数
// {string} dec_point：小数点符号
// {string} thousands_sep：千分位符号

const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  const n = !isFinite(+number) ? 0 : +number;
  const pre = !isFinite(+decimals) ? 2 : Math.abs(decimals);
  const sep = typeof thousands_sep === "undefined" ? "," : thousands_sep;
  const dec = typeof dec_point === "undefined" ? "." : dec_point;
  let s = "";
  const toFixedFix = function (n, pre) {
    const k = Math.pow(10, pre);
    return "" + Math.ceil(n * k) / k;
  };
  s = (pre ? toFixedFix(n, pre) : "" + Math.round(n)).split(".");
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < pre) {
    s[1] = s[1] || "";
    s[1] += new Array(pre - s[1].length + 1).join("0");
  }
  return s.join(dec);
};

// 非大数取整
function intNumber(num) {
  return ~~num;
  //  num|0
}

export default {
  withinErrorMargin,
  isNumberPowerOfTwo,
  formatNumber,
  intNumber,
  moneyFormat
};
