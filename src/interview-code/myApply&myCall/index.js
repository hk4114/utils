/**
 * 1. 将函数设为传入参数的属性
 * 2. 指定 this 到函数并传入给定参数执行函数
 * 3. 如果不传入参数或者参数为 null，默认指向为 window 
 * 4. 删除参数上的函数
 */
Function.prototype.myCall = function (context, ...args) {
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol()
  cxt[func] = this;
  args = args ? args : []
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  //删除该方法，不然会对传入对象造成污染（添加该方法）
  delete cxt[func];
  return res;
}

/**
 * 第二个参数可以不传，但类型必须为数组或者类数组
 */
Function.prototype.myApply = function (context, args = []) {
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol()
  cxt[func] = this;
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  delete cxt[func];
  return res;
}

// 测试代码
const foo = {
  name: 'Selina'
}
const name = 'Chirs';
function bar(job, age) {
  console.log(this.name);
  console.log(job, age);
}

bar.myApply(foo, ['programmer', 20]);
bar.myApply(null, ['teacher', 25]);

bar.myCall(foo, 'programmer', 20);
bar.myCall(null, 'teacher', 25);