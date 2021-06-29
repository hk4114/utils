// 字符串是否是包含26个英文字母的短句
export function isPangram(str) {
  const string = str.toLowerCase();
  return "abcdefghijklmnopqrstuvwxyz".split("").every(x => string.indexOf(x) !== -1);
}

// 英文首字母大写
export function camelCase(str) {
  return str.trim().replace(/(?:^|\s+)(\w)/g, (_, c) => _.toUpperCase())
}

// 睡眠函数
export function sleep(delay) {
  return new Promise(reslove => {
    setTimeout(reslove, delay)
  })
}

// 数字格式化 3000 -> 3,000
export function formatNumber(str) {
  return ('' + str).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // number [number].toLocaleString('en-US')
}

// 非大数取整
export function intNumber(num) {
  return ~~num
  //  num|0
}

// 数组求和
export function sumArr(arr) {
  return arr.reduce((a, b) => a + b)
}

// 类数组转数组
export function list2arr(options) {
  // Array.from(options)
  // Array.prototype.slice.call(options)
  // Array.prototype.concat.apply([],options)
  return [...arguments]
}

// 值对换
// [a,b] = [b,a]
// a^=b b^=a a^=b

// 数组乱序
export function shuffle(arr) {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 取时间戳
// number(<Date>) -> + <Date>

// 取随机字符串 为长度 max 10 min 0
export function randomStr(l = 0) {
  const LENGTH = 13 - l
  return Math.random().toString(16).substring(LENGTH)
  // Math.random().toString(36).substring(2) 
}

// withinErrorMargin(0.1 + 0.2, 0.3) 
export function withinErrorMargin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

// fill array
// Array(6).fill(8)// [8,8,8,8,8,8]

// chain 链式取值
export function getChain(obj, props, def) {
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
// var c = {a: {b : [1,2,3] }}
// get(c ,'a.b')     // [1,2,3]
// get(c, 'a.b[1]')  // 2
// get(c, 'a.d', 12)  // 12


// get image natural width and height
export function getImageNatural(img, cb) {
  if (img.naturalWidth) { // 现代浏览器
    nWidth = img.naturalWidth
    nHeight = img.naturalHeight
    cb({ w: nWidth, h: nHeight })
  } else { // IE6/7/8
    var image = new Image();
    image.src = img.attr('src');
    if (image.complete) {
      cb({ w: image.width, h: image.height })
    } else {
      image.onload = function () {
        var w = image.width;
        var h = image.height;
        cb({ w: w, h: h })
      }
    }
  }
}

// 获取数组中的最后一项
export function getLstMember(num = 1) {
  return array.slice(-num)
}

// 获取数据类型
// obj => Object.prototype.toString.call(obj); 在业务代码中覆写了Object.prototype.toString方法，可能得不到正确的结果
export const type = Function.prototype.call.bind(Object.prototype.toString);

export function getType(val) {
  return type(val).replace(/\[object (\w+)\]/, "$1").toLowerCase()
}

// 创建链接字符串
export function createLinkStr(str, url) {
  return str.link(url) // `<a herf="www.google.com">google</a>`
}

// 数组交集
export function intersection(arr1, arr2) {
  return arr1.filter(function (val) { return arr2.indexOf(val) > -1 })
}
// object[]
export function intersectionObjectArray(arr1, arr2) {
  return arr2.filter(function (v) {
    return arr1.some(n => JSON.stringify(n) === JSON.stringify(v))
  })
}

// 数组并集
export function getUnion(arr1, arr2) {
  return arr1.concat(arr2.filter(v => !arr1.includes(v)))
}
// object[]
export function getUnionObjectArray(arr1, arr2) {
  let arr3 = arr1.concat(arr2);
  let result = [];
  let obj = [];
  result = arr3.reduce(function (prev, cur, index, arr) {
    obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur);
    return prev;
  }, []);
  return result
}

// 数组差集 数组arr1相对于arr2所没有的
export function getDiff(arr1, arr2) {
  return arr1.filter(item => !new Set(arr2).has(item))
}
// object[]
export function getDiffObjectArray(arr1, arr2) {
  return arr1.filter(function (v) {
    return arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
  })
}
// 数组补集 两个数组各自没有的集合
export function difference(arr1, arr2) {
  return Array.from(new Set(arr1.concat(arr2).filter(v => !new Set(arr1).has(v) || !new Set(arr2).has(v))))
}
export function differenceObjectArray(arr1, arr2) {
  let arr3 = arr1.concat(arr2);
  return arr3.filter(function (v) {
    return arr1.every(n => JSON.stringify(n) !== JSON.stringify(v)) || arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
  })
}

// 数组去重
export function unique(arg) {
  return [...new Set(arg)]
}

export function uniqueObjectArray(arg) {
  const obj = [];
  const result = arr.reduce(function (prev, cur, index, arr) {
    obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur);
    return prev;
  }, []);
  return result
}

// get url params
export function getUrlParams(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })

  return paramsObj;
}


export function stringifyUrl(search = {}) {
  return Object.entries(search)
    .reduce((t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`, Object.keys(search).length ? "?" : "")
    .replace(/&$/, "");
}

// check the number is power of 2
export const isNumberPowerOfTwo = number => !!number && (number & (number - 1)) === 0;

export function getLastPageUrl() {
  return document.referrer
}

// 目标元素全屏
export function fullScreen(id) {
  if (document.fullscreenEnabled) {
    document.getElementById(id).requestFullscreen();
  }
}

export async function performCopy(event) {
  event.preventDefault();
  if (navigator.clipboard && navigator.clipboard.read && navigator.clipboard.write) {
    try {
      await navigator.clipboard.writeText(copyText);
      console.log(`${copyText} copied to clipboard`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
}
export async function performPaste(event) {
  event.preventDefault();
  if (!(navigator.clipboard && navigator.clipboard.read && navigator.clipboard.write)) {
    return false
  }
  try {
    const text = await navigator.clipboard.readText();
    setPastetext(text);
    console.log('Pasted content: ', text);
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}


export function getBrowser() {
  const { userAgent } = navigator;
  const rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
  const rEdge = /(edge)\/([\w.]+)/;
  const rFirefox = /(firefox)\/([\w.]+)/;
  const rOpera = /(opera).+version\/([\w.]+)/;
  const rChrome = /(chrome)\/([\w.]+)/;
  const rSafari = /version\/([\w.]+).*(safari)/;
  let browser = "other";
  let version = "0";
  let brand = "other";
  const ua = userAgent.toLowerCase();
  const { vendor } = navigator;
  function uaMatch(ua) {
    let match = rMsie.exec(ua);
    if (match != null) {
      return { browser: "ie", version: match[2] || "0" };
    }
    match = rEdge.exec(ua);
    if (match != null) {
      return { browser: "edge", version: match[2] || "0" };
    }
    match = rChrome.exec(ua);
    if (match != null && /Google/.test(vendor)) {
      return { browser: match[1] || "", version: match[2] || "0" };
    }
    match = rSafari.exec(ua);
    if (match != null && /Apple Computer/.test(vendor)) {
      return { browser: match[2] || "", version: match[1] || "0" };
    }
    match = rFirefox.exec(ua);
    if (match != null) {
      return { browser: match[1] || "", version: match[2] || "0" };
    }
    match = rOpera.exec(ua);
    if (match != null) {
      return { browser: match[1] || "", version: match[2] || "0" };
    }
    return { browser: "other", version: "0" };
  }

  try {
    const browserMatch = uaMatch(ua);
    ({ browser, version } = browserMatch);

    if (/qqbrowser/.test(ua)) {
      brand = "qq";
    } else if (/se/.test(ua) && /metasr/.test(ua)) {
      brand = "sougou";
    } else if (/360se/.test(ua)) {
      brand = "360";
    } else if (/ucweb/.test(ua)) {
      brand = "uc";
    } else if (/2345explorer/.test(ua)) {
      brand = "2345";
    } else if (/lbbrowser/.test(ua)) {
      brand = "liebao";
    } else if (/maxthon/.test(ua)) {
      brand = "maxthon";
    } else {
      brand = browser;
    }
  } catch (e) {
    console.error(` getBrowser error: ${e}`);
  }
  return `${brand}_${browser}_${version}`;
}