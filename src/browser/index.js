// 获取浏览器信息
function getBrowser() {
  const { userAgent } = navigator
  const rMsie = /(msie\s|trident.*rv:)([\w.]+)/
  const rEdge = /(edge)\/([\w.]+)/
  const rFirefox = /(firefox)\/([\w.]+)/
  const rOpera = /(opera).+version\/([\w.]+)/
  const rChrome = /(chrome)\/([\w.]+)/
  const rSafari = /version\/([\w.]+).*(safari)/
  let browser = "other"
  let version = "0"
  let brand = "other"
  const ua = userAgent.toLowerCase()
  const { vendor } = navigator
  function uaMatch(ua) {
    let match = rMsie.exec(ua)
    if (match != null) {
      return { browser: "ie", version: match[2] || "0" }
    }
    match = rEdge.exec(ua)
    if (match != null) {
      return { browser: "edge", version: match[2] || "0" }
    }
    match = rChrome.exec(ua)
    if (match != null && /Google/.test(vendor)) {
      return { browser: match[1] || "", version: match[2] || "0" }
    }
    match = rSafari.exec(ua)
    if (match != null && /Apple Computer/.test(vendor)) {
      return { browser: match[2] || "", version: match[1] || "0" }
    }
    match = rFirefox.exec(ua)
    if (match != null) {
      return { browser: match[1] || "", version: match[2] || "0" }
    }
    match = rOpera.exec(ua)
    if (match != null) {
      return { browser: match[1] || "", version: match[2] || "0" }
    }
    return { browser: "other", version: "0" }
  }

  try {
    const browserMatch = uaMatch(ua)
    ;({ browser, version } = browserMatch)

    if (/qqbrowser/.test(ua)) {
      brand = "qq"
    } else if (/se/.test(ua) && /metasr/.test(ua)) {
      brand = "sougou"
    } else if (/360se/.test(ua)) {
      brand = "360"
    } else if (/ucweb/.test(ua)) {
      brand = "uc"
    } else if (/2345explorer/.test(ua)) {
      brand = "2345"
    } else if (/lbbrowser/.test(ua)) {
      brand = "liebao"
    } else if (/maxthon/.test(ua)) {
      brand = "maxthon"
    } else {
      brand = browser
    }
  } catch (e) {
    console.error(` getBrowser error: ${e}`)
  }
  return `${brand}_${browser}_${version}`
}

// 复制
async function performCopy(event) {
  event.preventDefault()
  if (
    navigator.clipboard &&
    navigator.clipboard.read &&
    navigator.clipboard.write
  ) {
    try {
      await navigator.clipboard.writeText(copyText)
      console.log(`${copyText} copied to clipboard`)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }
}
// 粘贴
async function performPaste(event) {
  event.preventDefault()
  if (
    !(
      navigator.clipboard &&
      navigator.clipboard.read &&
      navigator.clipboard.write
    )
  ) {
    return false
  }
  try {
    const text = await navigator.clipboard.readText()
    setPastetext(text)
    console.log("Pasted content: ", text)
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err)
  }
}

const copyText = async (val) => {
  try {
    // 使用现代 API 尝试复制
    if (navigator.clipboard && navigator.permissions) {
      await navigator.clipboard.writeText(val)
      return // 如果成功，直接返回
    }

    // 降级方案
    const textArea = document.createElement("textArea")
    textArea.value = val
    textArea.style.width = 0
    textArea.style.position = "fixed"
    textArea.style.left = "-999px"
    textArea.style.top = "10px"
    textArea.setAttribute("readonly", "readonly")
    document.body.appendChild(textArea)
    textArea.select()

    // 尝试执行复制操作
    const success = document.execCommand("copy")
    if (!success) {
      throw new Error("无法复制文本")
    }

    // 清理
    document.body.removeChild(textArea)
  } catch (err) {
    console.error("复制失败:", err)
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
  if (img.naturalWidth) {
    // 现代浏览器
    nWidth = img.naturalWidth
    nHeight = img.naturalHeight
    cb({ w: nWidth, h: nHeight })
  } else {
    // IE6/7/8
    var image = new Image()
    image.src = img.attr("src")
    if (image.complete) {
      cb({ w: image.width, h: image.height })
    } else {
      image.onload = function () {
        var w = image.width
        var h = image.height
        cb({ w: w, h: h })
      }
    }
  }
}

function findParent(dom, className) {
  let parent = dom.parentElement
  if (dom && parent.className !== className) {
    parent = findParent(dom.parentElement, className)
  }
  return parent
}

function getElementTop(element, target) {
  const eleRect = element.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  if (eleRect && targetRect) {
    return targetRect.top - eleRect.top
  }

  var actualTop = element.offsetTop
  var current = element.offsetParent

  while (current !== target) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}

function getElementLeft(element, target) {
  const eleRect = element.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  if (eleRect && targetRect) {
    return targetRect.left - eleRect.left
  }

  var actualLeft = element.offsetLeft
  var current = element.offsetParent

  while (current !== target) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  return actualLeft
}

// 判断是否全屏
function isFullScreen() {
  return !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  )
}

// 全屏
function launchFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

// 退出全屏
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

class MyCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  setItem(key, value) {
    if (typeof value === "object") value = JSON.stringify(value)
    this.storage.setItem(key, value)
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key))
    } catch (err) {
      return this.storage.getItem(key)
    }
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  key(index) {
    return this.storage.key(index)
  }

  length() {
    return this.storage.length
  }
}

const localCache = new MyCache()
const sessionCache = new MyCache(false)

// localCache.getItem('user')
// sessionCache.setItem('name','kane')
// sessionCache.getItem('token')
// localCache.clear()

// 当你需要将录制当前屏幕，并将录屏上传或下载
export function recordScreen() {
  const streamPromise = navigator.mediaDevices.getDisplayMedia()
  streamPromise
    .then((stream) => {
      var recordedChunks = [] // 录制的视频数据

      var options = { mimeType: "video/webm; codecs=vp9" } // 设置编码格式
      var mediaRecorder = new MediaRecorder(stream, options) // 初始化MediaRecorder实例

      mediaRecorder.ondataavailable = handleDataAvailable // 设置数据可用（录屏结束）时的回调
      mediaRecorder.start()
      // 视频碎片合并
      function handleDataAvailable(event) {
        if (event.data.size > 0) {
          recordedChunks.push(event.data) // 添加数据，event.data是一个BLOB对象
          download() // 封装成BLOB对象并下载
        }
      }

      // 文件下载
      function download() {
        var blob = new Blob(recordedChunks, {
          type: "video/webm",
        })
        // 生成带时间戳的文件名
        const fileName = `screen-record-${Date.now()}.webm`
        var url = URL.createObjectURL(blob)
        var a = document.createElement("a")
        document.body.appendChild(a)
        a.style = "display: none"
        a.href = url
        a.download = fileName // 使用动态文件名
        a.click()
        window.URL.revokeObjectURL(url)

        // 清理DOM元素
        document.body.removeChild(a)
      }

      // 添加停止按钮监听
      stream.getVideoTracks()[0].addEventListener("ended", () => {
        mediaRecorder.stop()
      })

      mediaRecorder.onstop = () => {
        // 正确的事件触发点
        // download()
        // 释放媒体流
        stream.getTracks().forEach((track) => track.stop())
      }
    })
    .catch((error) => {
      // 添加错误处理
      console.error("Error accessing media devices:", error)
    })
}


function scrollHorizontally(event) {
  //获取滚轮跨距，兼容获取方式
  let detail = event.wheelDelta || event.detail || event.wheelDeltaY
  let moveForwardStep = -1
  let moveBackStep = 1
  let step = 0
  //如果跨步大于0，表明正向跨步，将跨步放大100倍，改变滑动速度，如果跨步小于0，表明反向跨步，将跨步放大500倍，改变滑动速度
  step = detail > 0 ? moveForwardStep * 80 : moveBackStep * 80
  /*覆盖当前滚动条的位置,单位是像素，叠增或剃减*/
  this.documentObj.scrollLeft = this.documentObj.scrollLeft + step

  //平滑值(越小越慢，不能小于等于0)
  let slipNum = 0.6
  //末尾值（越小，则越平稳，越大越仓促）
  let endNum = 3
  /*递减步伐值*/
  let decreasingPaceNum = step
  /*速度*/
  let paceNum = 60

  /*效果一*/
  let t = setInterval(() => {
    if (Math.abs(decreasingPaceNum) < endNum) {
      clearInterval(t)
      return
    }
    decreasingPaceNum = decreasingPaceNum * slipNum
    this.documentObj.scrollLeft =
      this.documentObj.scrollLeft + decreasingPaceNum
  }, paceNum)

  /*效果二*/
  /*for(let i=1;Math.abs(decreasingPaceNum) > endNum;i++){
      decreasingPaceNum = decreasingPaceNum * slipNum
      setTimeout(() => {
        this.documentObj.scrollLeft = this.documentObj.scrollLeft + decreasingPaceNum
      }, i * paceNum)
    }*/
}

// 滚轮操纵横向滚动条
export function setScrollFun(id) {
  //绑定的容器
  const dom = document.getElementById(id)
  dom.addEventListener(
    "DOMMouseScroll",
    scrollHorizontally,
    false
  )
  dom.addEventListener(
    "mousewheel",
    scrollHorizontally,
    false
  )
  // <div id="events-wrap"></div>
  // mounted() {
  //   this.$nextTick(() => {
  //     this.setScrollFun();
  //   });
  // },
  // this.documentObj = document.getElementById(id)
  // this.documentObj.addEventListener(
  //   "DOMMouseScroll",
  //   this.scrollHorizontally,
  //   false
  // )
  // this.documentObj.addEventListener(
  //   "mousewheel",
  //   this.scrollHorizontally,
  //   false
  // )
}

export default {
  getBrowser,
  performCopy,
  performPaste,
  getLastPageUrl,
  createLinkStr,
  getImageNatural,
  findParent,
  getElementTop,
  getElementLeft,
  isFullScreen,
  launchFullScreen,
  exitFullScreen,
  recordScreen,
  localCache,
  sessionCache,
  setScrollFun
}
