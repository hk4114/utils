// L instanceof R
function myInstanceOf(L, R) {// L 表示左表达式，R 表示右表达式
  let O = R.prototype;// 取 R 的显式原型
  L = L.__proto__;    // 取 L 的隐式原型 
  // L = Object.getPrototypeOf(L) // 获取对象的原型
  while (true) {
      if (L === null) // 已经找到顶层
          return false;
      if (O === L)   // 当 O 严格等于 L 时，返回 true
          return true;
      L = L.__proto__;  // 继续向上一层原型链查找
  }
}

let a = [1,2,3]
console.log(myInstanceOf(a, String)); // false