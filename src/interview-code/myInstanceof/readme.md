## instanceof 
可以准确的判断复杂数据类型，但是不能正确判断基本数据类型，在原型链上的结果未必准确，不能检测null,undefined。
测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

通过原型链判断的，A instanceof B, 
1. 在 A 的原型链中层层查找，是否有原型等于 B.prototype。
2. 如果一直找到 A 的原型链的顶端 (null; 即`Object.prototype.__proto__`), 仍然不等于 B.prototype，那么返回 false，否则返回 true。

