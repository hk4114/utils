/**
 * 1. 创建一个新对象
 * 2. 这个新对象会被执行 [[原型]] 连接
 * 3. 将构造函数的作用域赋值给新对象，即 this 指向这个新对象
 * 4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象
 */
function myNew() {
  var obj = new Object() // 创建一个新对象
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype; // 创建一个新对象
  var ret = Constructor.apply(obj, arguments); // //将构造函数绑定到obj中
  // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
  return typeof ret === 'object' ? ret || obj : obj;
};

function person(name, age) {
  this.name = name
  this.age = age
}

let p = myNew(person, '布兰', 12)
console.log(p)  // { name: '布兰', age: 12 }
