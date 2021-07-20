/**
 * 1. 绑定在原型上的方法
 * 2. 改变 this 的指向
 * 3. 支持柯里化
 * 4. 考虑 new 的调用
 * 5. 保留函数原型
 */

// 1. 绑定在原型上的方法
Function.prototype.myBind = function(target) {
  // 判断是否为函数调用
  if (typeof target !== 'function' || Object.prototype.toString.call(target) !== '[object Function]') {
    throw new TypeError(this + ' must be a function');
  }
  const _this = this;
  // 3. 支持柯里化
  const args = [...arguments].slice(1)
  
  // 5. 保留函数原型
  const wrapper = function (){
    // 3. 支持柯里化
    const finalArgs = [...args, ...arguments];

    // 4. 考虑 new 的调用
    if(new.target !== undefined) { // new.target 用来检测是否是被 new 调用
    
      const result = _this.apply(target, finalArgs);
    
      if(result instanceof Object) return reuslt; // 判断改函数是否返回对象
    
      return this // 没有返回对象就返回 this
    
    }else { // 不是 new
      _this.apply(target, finalArgs)
    }
  }
  
  // 2. 改变 this 的指向
  // _this.apply(target, finalArgs)

  if (_this.prototype) { // 保留函数原型
    // bound.prototype = _this.prototype // _this.prototype 导致原函数的原型被修改 应使用 Object.create
    bound.prototype = Object.create(_this.prototype);
    bound.prototype.constructor = _this;
  }
  
  return wrapper
}