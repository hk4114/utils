## step 1 绑定原型
```js
Function.prototype.myBind = function() {}
```

## step 2 改变 this 指向
```js
Function.prototype.myBind = function(target) {
  const _this = this;
  return function() {
    _this.apply(target)
  } 
}
```

## step 3 支持柯里化
```js
function fn(x) {
 return function (y) {
  return x + y;
 }
}
var fn1 = fn(1)(2);
fn1(3) // 6
```
柯里化使用了闭包，当执行 fn1 的时候，形成了闭包，函数内获取到了外层函数的 x。
1. 获取当前外部函数的 arguments, 去除绑定的对象，保存成变量 args.
2. return -> 再一次获取当前函数的  arguments, 最终用 finalArgs 进行合并。

```js
Function.prototype.myBind = function(target) {
  const _this = this;
  const args = [...arguments].slice(1)
  return function (){
    const finalArgs = [...args, ...arguments]
    _this.apply(target, finalArgs)
  }
}
```

## step 4  new 的调用
通过 bind 绑定之后，依然是可以通过 new 来进行实例化的， new 的优先级会高于 bind

new 关键字会进行如下的操作：
1. 创建一个空的简单JavaScript对象（即{}）；
2. 链接该对象（设置该对象的constructor）到另一个对象 ；
3. 将步骤1新创建的对象作为this的上下文 ；
4. 如果该函数没有返回对象，则返回this。

```js
Function.prototype.myBind = function(target) {
  const _this = this;
  const args = [...arguments].slice(1)
  return function (){
    const finalArgs = [...args, ...arguments];
    if(new.target !== undefined) { // new.target 用来检测是否是被 new 调用
      const result = _this.apply(target, finalArgs);
      if(result instanceof Object) { // 判断改函数是否返回对象
        return reuslt;
      }
      return this // 没有返回对象就返回 this
    }else { // 不是 new
      _this.apply(target, finalArgs)
    }
  }
}
```

## step 5 保留函数原型

```js
Function.prototype.myBind = function(target) {
  // 判断是否为函数调用
  if (typeof target !== 'function' || Object.prototype.toString.call(target) !== '[object Function]') {
    throw new TypeError(this + ' must be a function');
  }
  const _this = this;
  const args = [...arguments].slice(1)
  
  const wrapper = function (){
    const finalArgs = [...args, ...arguments];
    if(new.target !== undefined) {
      const result = _this.apply(target, finalArgs);
      if(result instanceof Object) return reuslt;
      return this
    }else {
      _this.apply(target, finalArgs)
    }
  }
  
  if (_this.prototype) {
    // bound.prototype = _this.prototype // _this.prototype 导致原函数的原型被修改 应使用 Object.create
    bound.prototype = Object.create(_this.prototype);
    bound.prototype.constructor = _this;
  }
  
  return wrapper
}
```


[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#polyfill)
[更完整的解决方案](https://github.com/Raynos/function-bind)