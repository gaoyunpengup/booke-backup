## this关键字
this是函数体内的一个关键字, 不同函数和不同的环境都会影响this的值 <br>
## this指向
|使用环境|this默认指向|
|---|---|
|function函数|函数的调用者|
|箭头函数|外层作用域this的值|
|node环境|指向global对象|
## this绑定规则
::: tip 1. 默认绑定
:::
* 案例1: 默认window调用方法
``` js
function fnOne(){
    console.log(this); // window
}
fnOne(); // 其实是window.fnOne(), 所以调用者是window
```
* 案例2: 定时器回调函数
``` js
setTimeout(function(){ // setTimeout运行在Window的环境下
    console.log(this);  // 默认指向window
}, 0);
```
* 案例3: 匿名自调用函数
``` js
(function(){ // 匿名自调用函数运行在window环境下
    console.log(this); // 代码默认前面都有个window.调用, 所以this默认指向window
})();
```
::: tip 2. 隐式绑定: 看调用者
:::
* 案例1: JS获取标签.事件函数
``` js
<button id="btn">点我</button>
document.getElementById("btn").onclick = function(){
    console.log(this); // onclick事件绑定到按钮, 所以this指向btn按钮
}
```
* 案例2: 对象调用函数
``` js
let obj = {
    a: "web前端",
    b: function(){
        console.log(this); // obj对象
    }
}
obj.b(); // b函数的调用者是obj
```
* 案例3: 取出函数, 再调用
``` js
let obj2 = {
    a: "web前端",
    b: function(){
        console.log(this); // window
    }
}
let fn = obj2.b; // 这里不是调用函数, 而是取出函数
fn(); // 默认前面有个window在调用.
```
* 案例4: 返回函数再调用
``` js
let obj3 = {
    a: "web前端3",
    b: function(){
        return function(){
            console.log(this); // window
        }
    }
}
let fn2 = obj3.b(); // 调用后里面return出来function(){}赋予给fn2变量
fn2(); // 默认前面有个window
```
* 案例5: 返回对象, 调用里面函数
``` js
let obj4 = {
    a: "web前端",
    b: function(){
        return {
            c: "h5啊",
            d: function(){
                console.log(this); // 指向当前c, d为key的此对象
            }
        }
    }
}
obj4.b().d(); // obj4.b() 得到对象, 然后对象.d()调用的, 所以看好调用者是谁
```
::: tip 3. 硬绑定: 直接修改this指向
:::
使用call和apply, 会触发函数, this的值是传入的对象, 在传入的对象上绑定属性 <br>
如果不传或者传null, 还是默认该指向谁就指向谁 <br>
bind不会马上触发函数, 效果和call和apply一样 <br>
``` js
function Person(){
    this.username = "";
    this.age = 0;
}
let obj = {};
Person.call(obj); // call/apply效果相同, 调用Person函数, 这时this指向的值为obj对象, 并且在obj对象上添加username和age属性
// obj的值: {username: "", age: 0}
```
::: tip 4. new 绑定
:::
默认配合构造函数使用, 使this指向新的对象
``` js
function objectFactory(Base, ...arr) {
    // Base 是new 后面的类名
    let obj = new Object(); //从Object.prototype上克隆一个对象
    obj.__proto__ = Base.prototype; // 继承Base原型里属性/方法
    Base.call(obj, ...arr); // 继承Base构造函数里属性/方法
    return obj; //返回 obj
}
```
## this优先级
绑定优先级 new > 硬绑定 > 隐式 > 默认
