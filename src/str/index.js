// 字符串是否是包含26个英文字母的短句
function isPangram(str) {
  const string = str.toLowerCase();
  return "abcdefghijklmnopqrstuvwxyz".split("").every(x => string.indexOf(x) !== -1);
}

// type 1-全大写 2-全小写 3-首字母大写
function turnCase (str, type = 1) {
  switch (type) {
    case 1:
      return str.toUpperCase()
    case 2:
      return str.toLowerCase()
    case 3:
      return str.trim().replace(/(?:^|\s+)(\w)/g, (_, c) => _.toUpperCase())
  }
}


// 获取url
function stringifyUrl(search = {}) {
  return Object.entries(search)
    .reduce((t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`, Object.keys(search).length ? "?" : "")
    .replace(/&$/, "");
}

// get url params
function getUrlParams(url) {
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

// 模板字符串
function renderTemplateStr(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return renderTemplateStr(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

// 手机号脱敏
function hideMobile(mobile) {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}


export default{
  isPangram,
  turnCase,
  stringifyUrl,
  getUrlParams,
  renderTemplateStr,
  hideMobile
}