// chain 链式取值
function getChain(obj, props, def) {
  if ((obj == null) || obj == null || typeof props !== 'string') return def;
  const temp = props.split('.');
  const fieldArr = [].concat(temp);
  temp.forEach((e, i) => {
    if (/^(\w+)\[(\w+)\]$/.test(e)) {
      const matchs = e.match(/^(\w+)\[(\w+)\]$/);
      const field1 = matchs[1];
      const field2 = matchs[2];
      const index = fieldArr.indexOf(e);
      fieldArr.splice(index, 1, field1, field2);
    }
  })
  return fieldArr.reduce((pre, cur) => {
    const target = pre[cur] || def;

    if (target instanceof Array) {
      return [].concat(target);
    }
    if (target instanceof Object) {
      return Object.assign({}, target)
    }
    return target;
  }, obj)
}

// 睡眠函数
function sleep(delay) {
  return new Promise(reslove => {
    setTimeout(reslove, delay)
  })
}

// 防抖
function debounce(fn, ms) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null
    }, ms)
  }
}

// 节流
function throttle(fn, ms) {
  let start = + new Date();
  let timer = null;
  return function (...args) {
    const cur = + new Date();
    if (timer) clearTimeout(timer);
    if (cur - start >= ms) {
      fn(...args);
      start = cur
    } else {
      timer = setTimeout(() => {
        fn(...args);
        timer = null
      }, ms)
    }
  }
}

// 类数组转数组
function list2arr(options) {
  // Array.from(options)
  // Array.prototype.slice.call(options)
  // Array.prototype.concat.apply([],options)
  return [...arguments]
}


export default{
  getChain,
  sleep,
  debounce,
  throttle,
  list2arr
}