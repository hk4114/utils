// 获取浏览器信息
function getBrowser() {
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

// 复制
async function performCopy(event) {
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
// 粘贴
async function performPaste(event) {
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

// 目标元素全屏
function getFullScreen(id) {
  if (document.fullscreenEnabled) {
    document.getElementById(id).requestFullscreen();
  }
}

// 获取上一页url
function getLastPageUrl() {
  return document.referrer
}


// 创建链接字符串
function createLinkStr(str, url) {
  return str.link(url) // `<a herf="www.google.com">google</a>`
}

// get image natural width and height
function getImageNatural(img, cb) {
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

export default {
  getBrowser,
  performCopy,
  performPaste,
  getFullScreen,
  getLastPageUrl,
  createLinkStr,
  getImageNatural
}