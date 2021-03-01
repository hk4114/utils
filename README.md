# README

> common function

1. isPangram 判断字符串是否是包含26个英文字母的短句
2. camelCase 英文首字母大写
3. sleep 睡眠函数
4. unique 数组简单去重
5. formatNumber 数字格式化
6. intNumber 数字取整数
7. sumArr 数组求和
8. list2arr 类数组转数组
9. arrRandom 数组乱序
10. randomStr 随机字符串
11. withinErrorMargin 数字计算buffer
12. getChain 链式取值
13. GetParams 获取 url 参数
14. getImageNatural 获取图片原始尺寸
15. getLstMember 获取数组中的最后一项
16. getType 获取数据类型
17. createLinkStr 创建链接字符串
18. isNumberPowerOfTwo 检查是否为2的幂数
19. getLastPageUrl returns the URI of the page that linked to this page.
20. performCopy/performPaste 浏览器新api 复制粘贴
 

```js
// 拦截对象
let obj = { name: '', age: '', sex: '' },
  defaultName = ["这是姓名默认值1", "这是年龄默认值1", "这是性别默认值1"];
Object.keys(obj).forEach(key => {
Object.defineProperty(obj, key, { // 拦截整个object 对象，并通过get获取值，set设置值，vue 2.x的核心就是这个来监听
    get() {
            return defaultName;
        },
    set(value) {
            defaultName = value;
        }
    });
});

console.log(obj.name); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
console.log(obj.age); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
console.log(obj.sex); // [ '这是姓名默认值1', '这是年龄默认值1', '这是性别默认值1' ]
obj.name = "这是改变值1";
console.log(obj.name); // 这是改变值1
console.log(obj.age);  // 这是改变值1
console.log(obj.sex); // 这是改变值1

let objOne = {}, defaultNameOne = "这是默认值2";
Object.defineProperty(obj, 'name', {
    get() {
        return defaultNameOne;
    },
    set(value) {
        defaultNameOne = value;
    }
});
console.log(objOne.name); // undefined
objOne.name = "这是改变值2";
console.log(objOne.name); // 这是改变值2


let obj = { name: '', age: '', sex: '' }
let handler = {
    get(target, key, receiver) {
        console.log("get", key); 
        return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
        console.log("set", key, value); // set name 李四  // set age 24
        return Reflect.set(target, key, value, receiver);
    }
};
let proxy = new Proxy(obj, handler);
proxy.name = "李四";
proxy.age = 24;
```

对象深度拷贝
```js
const objDeepClone = obj => {
    return clone(obj)
}

const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    // 判断数据类型的经典方法：
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
        case 'Array':
            flag = typeString === '[object Array]';
        break;
        case 'Date':
            flag = typeString === '[object Date]';
        break;
        case 'RegExp':
            flag = typeString === '[object RegExp]';
        break;
        default:
            flag = false;
    }
    return flag;
};

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const clone = parent => {
    // 维护两个储存循环引用的数组
    const parents = []
    const children = []
    const _clone = parent => {
        if (parent === null) return null
        if (typeof parent !== 'object') return parent

        let child, proto;

        if (isType(parent, 'Array')) {
        // 对数组做特殊处理
        child = []
        } else if (isType(parent, 'RegExp')) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent))
            if (parent.lastIndex) child.lastIndex = parent.lastIndex
        } else if (isType(parent, 'Date')) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime())
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent)
            // 利用Object.create切断原型链
            child = Object.create(proto)
        }

        // 处理循环引用
        const index = parents.indexOf(parent)

        if (index !== -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index]
        }
        parents.push(parent)
        children.push(child)

        for (const i in parent) {
            // 递归
            child[i] = _clone(parent[i])
        }
        return child
    }
    return _clone(parent)
}

console.log(objDeepClone({ 
  name: '张三', age: 23, 
  obj: { name: '李四', age: 46},
  arr:[1,2,3]
})) // { name: '张三', age: 23, obj: { name: '李四', age: 46 }, arr:[ 1, 2, 3 ] }

// 对象是否相等
function deepCompare(x, y) {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
        var p;
        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.     
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            } else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof (x[p])) {
                case 'object':
                case 'function':
                    leftChain.push(x);
                    rightChain.push(y);

                if (!compare2Objects(x[p], y[p])) {
                    return false;
                }
                leftChain.pop();
                rightChain.pop();
                break;
                default:
                if (x[p] !== y[p]) {
                    return false;
                }
                break;
            }
        }
        return true;
    }

    if (arguments.length < 1) {
        return true; 
    }

    for (i = 1, l = arguments.length; i < l; i++) {
        leftChain = []; //Todo: this can be cached
        rightChain = [];
        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }
    return true;
}

const obj1 = { 
name: '张三', age: 23, 
obj: { name: '李四', age: 46 }, 
arr: [1, 2, 3],
date:new Date(23),
reg: new RegExp('abc'),
fun: ()=>{}
 }
const obj2 = { 
name: '张三', age: 23, 
obj: { name: '李四', age: 46 }, 
arr: [1, 2, 3],
date: new Date(23),
reg: new RegExp('abc'),
fun: ()=>{}
 }
console.log(deepCompare(obj1,obj2)) // true
```
