# README

## [数组](./src/arr/index.js)
|             result             |        func name         |
| :----------------------------: | :----------------------: |
|            数组乱序            |         shuffle          |
|      获取数组中的最后一项      |       getLstMember       |
|            数组交集            |       intersection       |
|       数组交集 object[]        | intersectionObjectArray  |
|            数组并集            |         getUnion         |
|       数组并集 object[]        |   getUnionObjectArray    |
|            数组差集            |         getDiff          |
|       数组差集 object[]        |    getDiffObjectArray    |
|            数组补集            |      getComplement       |
|       数组补集 object[]        | getComplementObjectArray |
|            数组去重            |          unique          |
|       数组去重 object[]        |    uniqueObjectArray     |
|     计算数组某个字段的总数     |     calcObjArrTotal      |
| 计算并修正数组占比，使合计100% |      fixObjArrRate       |

## [数字](./src/num/index.js)
|              result               |     func name      |
| :-------------------------------: | :----------------: |
| withinErrorMargin(0.1 + 0.2, 0.3) | withinErrorMargin  |
|  check the number is power of 2   | isNumberPowerOfTwo |
|    formatNumber 3000 -> 3,000     |    formatNumber    |
|            非大数取整             |     intNumber      |


## [对象](./src/obj/index.js)
|      result      |   func name   |
| :--------------: | :-----------: |
|   获取数据类型   |    getType    |
| 比较对象是否相等 |  deepCompare  |
|      深拷贝      | objDeepClone  |
|    获取原型链    | getProtoChain |

## [浏览器](./src/browser/index.js)
|           result           |    func name    |
| :------------------------: | :-------------: |
|       获取浏览器信息       |   getBrowser    |
|            复制            |   performCopy   |
|            粘贴            |  performPaste   |
|        目标元素全屏        |  getFullScreen  |
|       获取上一页url        | getLastPageUrl  |
|       创建链接字符串       |  createLinkStr  |
|      获取图片原始宽高      | getImageNatural |
|       获取指定父元素       |   findParent    |
| 获取元素相对于某元素的left | getElementLeft  |
| 获取元素相对于某元素的top  |  getElementTop  |


## [字符串](./src/str/index.js)
|     result     |     func name     |
| :------------: | :---------------: |
| get url params |   getUrlParams    |
|   拼接成url    |   stringifyUrl    |
|   模板字符串   | renderTemplateStr |
| 英文首字母大写 |     camelCase     |
|   isPangram    |     isPangram     |

## [其他](./src/other/index.js)
|        result        |         func name          |
| :------------------: | :------------------------: |
|       链式取值       |          getChain          |
|       睡眠函数       |           sleep            |
|         防抖         |          debounce          |
|         节流         |          throttle          |
|     类数组转数组     |          list2arr          |
|     检测暗色主题     |         isDarkMode         |
|    滚动到顶/底部     | scrollToTop/scrollToBottom |
| 检测元素是否在屏幕中 |       Interobserver        |
|  从 URL 中获取参数   |       getParamByUrl        |


## [css](./util.css)
|      result      |  class name   |
| :--------------: | :-----------: |
|   图文不可复制   |    no-copy    |
|   多行文本溢出   |   rows-ell    |
| placeholder颜色  |      pls      |
|    图片变黑白    |  desaturate   |
|     光标变色     |    cursor     |
|   textarea换行   | textarea-wrap |
| 多行文本收起展开 |   clamp.css   |

## 笔试题
- [防抖节流](./src/interview-code/throttle&debounce)
- [bind](./src/interview-code/myBind)