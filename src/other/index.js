// 空值： [undefined, null, NaN, [], {}], 注意非空：0, false;
function isEmpty(value) {
  switch (Object.prototype.toString.call(value)) {
    case '[object Undefined]':
      return value === void 0;
    case '[object Null]':
      return value === null;
    case '[object Number]':
      return isNaN(value);
    case '[object String]':
      return value === "";
    case '[object Boolean]':
      return false;
    case '[object Object]':
      return Object.keys(value).length === 0;
    case '[object Array]':
      return value.length === 0;
    default:
      return false;
  }
}

// chain 链式取值
function getChain(obj, props, def) {
  if (obj == null || obj == null || typeof props !== "string") return def;
  const temp = props.split(".");
  const fieldArr = [].concat(temp);
  temp.forEach((e, i) => {
    if (/^(\w+)\[(\w+)\]$/.test(e)) {
      const matchs = e.match(/^(\w+)\[(\w+)\]$/);
      const field1 = matchs[1];
      const field2 = matchs[2];
      const index = fieldArr.indexOf(e);
      fieldArr.splice(index, 1, field1, field2);
    }
  });
  return fieldArr.reduce((pre, cur) => {
    const target = pre[cur] || def;

    if (target instanceof Array) {
      return [].concat(target);
    }
    if (target instanceof Object) {
      return Object.assign({}, target);
    }
    return target;
  }, obj);
}

// 睡眠函数
function sleep(delay) {
  return new Promise((reslove) => {
    setTimeout(reslove, delay);
  });
}

// 防抖
function debounce(fn, ms) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, ms);
  };
}

// 节流
function throttle(fn, ms) {
  let start = +new Date();
  let timer = null;
  return function (...args) {
    const cur = +new Date();
    if (timer) clearTimeout(timer);
    if (cur - start >= ms) {
      fn(...args);
      start = cur;
    } else {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, ms);
    }
  };
}

// 类数组转数组
function list2arr(options) {
  // Array.from(options)
  // Array.prototype.slice.call(options)
  // Array.prototype.concat.apply([],options)
  return [...arguments];
}

// 检测暗色主题
const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// 滚动到顶/底部
const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" });

const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });

const toTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
};

// 检测元素是否在屏幕中 IntersectionObserver
const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // `entry.target` is the dom element
      console.log(`${entry.target.id} is visible`);
    }
  });
};

const options = {
  threshold: 1.0,
};
const Interobserver = new IntersectionObserver(callback, options);
// const btn = document.getElementById("btn");
// const bottomBtn = document.getElementById("bottom-btn");
// Interobserver.observe(btn);
// Interobserver.observe(bottomBtn);

// 从 URL 中获取参数
const getParamByUrl = (key) => {
  const url = new URL(location.href);
  return url.searchParams.get(key);
};

// 下载文件
// downloadFile('/api/download', {id}, '文件名')
const downloadFile = (api, params, fileName, type = "get") => {
  axios({
    method: type,
    url: api,
    responseType: "blob",
    params: params,
  })
    .then((res) => {
      let str = res.headers["content-disposition"];
      if (!res || !str) {
        return;
      }
      let suffix = "";
      // 截取文件名和文件类型
      if (str.lastIndexOf(".")) {
        fileName
          ? ""
          : (fileName = decodeURI(
              str.substring(str.indexOf("=") + 1, str.lastIndexOf("."))
            ));
        suffix = str.substring(str.lastIndexOf("."), str.length);
      }
      //  如果支持微软的文件下载方式(ie10+浏览器)
      if (window.navigator.msSaveBlob) {
        try {
          const blobObject = new Blob([res.data]);
          window.navigator.msSaveBlob(blobObject, fileName + suffix);
        } catch (e) {
          console.log(e);
        }
      } else {
        //  其他浏览器
        let url = window.URL.createObjectURL(res.data);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileName + suffix);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default {
  getChain,
  sleep,
  debounce,
  throttle,
  list2arr,
  isDarkMode,
  getParamByUrl,
  scrollToTop,
  scrollToBottom,
  Interobserver,
  toTop,
  downloadFile
};
