/**
 * 防抖
 * 1. 函数在一段时间内多次触发只会执行第一次，在这段时间结束前，不管触发多少次也不会执行函数。
 * 2. 在等待时间内触发此函数，则重新计算等待时间。
 */
function debounce(fn, ms) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, ms)
  }
}

/**
 * 节流
 * 1. 在操作结束后才执行
 * 2. 如果超过了设定的时间，就执行一次处理函数。
 */

function throttle(fn, ms) {
  let timer = null
  let start = new Date;
  return function (...args) {
    if (timer) clearTimeout(timer); // 干掉事件回调
    const cur = + new Date();
    if (cur - start >= ms) {
      fn(...args) // 只执行一部分方法，这些方法是在某个时间段内执行一次
      start = cur
    } else {
      timer = setTimeout(() => { //让方法在脱离事件后也能执行一次
        fn(...args)
        timer = null
      }, ms)
    }
  }
}