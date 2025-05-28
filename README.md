# README

## [数组](./src/arr/index.js)

|             result              |        func name         |
| :-----------------------------: | :----------------------: |
|            数组乱序             |         shuffle          |
|      获取数组中的最后一项       |       getLstMember       |
|            数组交集             |       intersection       |
|        数组交集 object[]        | intersectionObjectArray  |
|            数组并集             |         getUnion         |
|        数组并集 object[]        |   getUnionObjectArray    |
|            数组差集             |         getDiff          |
|        数组差集 object[]        |    getDiffObjectArray    |
|            数组补集             |      getComplement       |
|        数组补集 object[]        | getComplementObjectArray |
|            数组去重             |          unique          |
|        数组去重 object[]        |    uniqueObjectArray     |
|     计算数组某个字段的总数      |     calcObjArrTotal      |
| 计算并修正数组占比，使合计 100% |      fixObjArrRate       |

## [数字](./src/num/index.js)

|              result               |        func name         |
| :-------------------------------: | :----------------------: |
| withinErrorMargin(0.1 + 0.2, 0.3) |    withinErrorMargin     |
|  check the number is power of 2   |    isNumberPowerOfTwo    |
|  formatNumber 3000 -> 3,000 金额  | formatNumber/moneyFormat |
|            非大数取整             |        intNumber         |

## [对象](./src/obj/index.js)

|      result      |   func name   |
| :--------------: | :-----------: |
|   获取数据类型   |    getType    |
| 比较对象是否相等 |  deepCompare  |
|      深拷贝      | objDeepClone  |
|    获取原型链    | getProtoChain |

## [浏览器](./src/browser/index.js)

|           result            |            func name            |
| :-------------------------: | :-----------------------------: |
|       获取浏览器信息        |           getBrowser            |
|            复制             |           performCopy           |
|            粘贴             |          performPaste           |
|       获取上一页 url        |         getLastPageUrl          |
|       创建链接字符串        |          createLinkStr          |
|      获取图片原始宽高       |         getImageNatural         |
|       获取指定父元素        |           findParent            |
| 获取元素相对于某元素的 left |         getElementLeft          |
| 获取元素相对于某元素的 top  |          getElementTop          |
|            全屏             | launchFullScreen/exitFullScreen |
|          存储操作           |    localCache, sessionCache     |
|            录屏             |          recordScreen           |
|     滚轮操纵横向滚动条      |          setScrollFun           |


## [字符串](./src/str/index.js)

|     result     |     func name     |
| :------------: | :---------------: |
| get url params |   getUrlParams    |
|   拼接成 url   |   stringifyUrl    |
|   模板字符串   | renderTemplateStr |
| 英文首字母大写 |     turnCase      |
|   isPangram    |     isPangram     |
|   脱敏手机号   |    hideMobile     |

## [其他](./src/other/index.js)

|        result        |            func name             |
| :------------------: | :------------------------------: |
|       链式取值       |             getChain             |
|       睡眠函数       |              sleep               |
|         防抖         |             debounce             |
|         节流         |             throttle             |
|     类数组转数组     |             list2arr             |
|     检测暗色主题     |            isDarkMode            |
|    滚动到顶/底部     | scrollToTop/scrollToBottom/toTop |
| 检测元素是否在屏幕中 |          Interobserver           |
|  从 URL 中获取参数   |          getParamByUrl           |
|       下载文件       |           downloadFile           |
|       判断为空       |             isEmpty              |

移除事件监听
```js
document.getElementById("button").addEventListener("click", () => {
  console.log("clicked!");
});

// 方法一
document.getElementById("button").removeEventListener("click", () => {
  console.log("clicked!");
});
// 方法一优化：
const myCallback = () => {
  console.log("clicked!");
};

document.getElementById("button").addEventListener("click", myCallback);
document.getElementById("button").removeEventListener("click", myCallback);
// 或者
document
  .getElementById("button")
  .addEventListener("click", function myCallback() {
    console.log("clicked!");
    this.removeEventListener("click", myCallback);
  });

// 方法二
document.getElementById("button").addEventListener(
  "click",
  () => {
    console.log("clicked!");
  },
  { once: true }
);

// 方法三
const button = document.getElementById("button");
const controller = new AbortController();
const { signal } = controller;

button.addEventListener("click", () => console.log("clicked!"), { signal });
window.addEventListener("resize", () => console.log("resized!"), { signal });
document.addEventListener("keyup", () => console.log("pressed!"), { signal });

// Remove all listeners at once:
controller.abort();
```


## [css](./util.css)

|      result      |  class name   |
| :--------------: | :-----------: |
|   图文不可复制   |    no-copy    |
|   多行文本溢出   |   rows-ell    |
| placeholder 颜色 |      pls      |
|    图片变黑白    |  desaturate   |
|     光标变色     |    cursor     |
|  textarea 换行   | textarea-wrap |
| 多行文本收起展开 |   clamp.css   |

## 笔试题

- [防抖节流](./src/interview-code/throttle&debounce)
- [bind](./src/interview-code/myBind)


## 移除事件监听器
方法一：

- 接受三个参数：要移除的监听器类型、该监听器的回调函数以及一个选项对象。
- 参数必须和设置监听器时使用的参数完全匹配，包括相同的回调引用。否则 `removeEventListener()` 将不起作用。

方法二

- 第二个对象参数有一个选项：once 选项
- 即使使用匿名函数，这种方法也是有效的，你的监听器只会被调用一次。

方法三

- `.addEventListener()` 可以配置一个信号，用于命令式地中止/删除监听器。当相应的控制器调用 .abort() 时，监听器会被移除
- 可以在不需要处理 .removeEventListener() 的潜在陷阱的情况下移除监听器。还有一个更大的优势：您可以使用一个信号一次性删除多个监听器，使用匿名函数也可以

```js
document.getElementById("button").addEventListener("click", () => {
  console.log("clicked!");
});

// 方法一
document.getElementById("button").removeEventListener("click", () => {
  console.log("clicked!");
});
// 方法一优化：
const myCallback = () => {
  console.log("clicked!");
};

document.getElementById("button").addEventListener("click", myCallback);
document.getElementById("button").removeEventListener("click", myCallback);

// 方法二
document.getElementById("button").addEventListener(
  "click",
  () => {
    console.log("clicked!");
  },
  { once: true }
);

// 方法三
const button = document.getElementById("button");
const controller = new AbortController();
const { signal } = controller;

button.addEventListener("click", () => console.log("clicked!"), { signal });
window.addEventListener("resize", () => console.log("resized!"), { signal });
document.addEventListener("keyup", () => console.log("pressed!"), { signal });

// Remove all listeners at once:
controller.abort();
```
