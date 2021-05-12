## instanceof运算符
* 作用: 确定对象是否是指定类的实例
* 用法: 对象 instanceof 类
``` js
function Person() {
}
let p = new Person();
console.log(p instanceof Person); // true
```
结果: 当属于指定类的实例对象时, 返回值为 true
## instanceof 原理
判断对象的__proto__上的constructor.prototype的值 <br>
是否等于instanceof后面的参数(函数对象)