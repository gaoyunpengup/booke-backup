### vue类的实现
还记得Vue应该怎么使用吧? 先看最下面代码 <br>
代码如下:
``` js
// 1. 观察者构造函数
// 参数1: Vue类对象
// 参数2: 属性改变Dom要做的操作函数
// 参数3: 监听的属性名
function Watcher(vm, cb, exp) {
    this.vm = vm; 
    this.cb = cb; 
    this.exp = exp; 
    this.value = this.get();  // 调用一下下面的get方法, 把watcher对象提交到Dep订阅者中
}
Watcher.prototype = {
    // 2. 修改update方法, 触发后把新值回调给new Watcher的地方
    update: function() {
        let value = this.vm.data[this.exp]; // 拿到vue的data中的key对应的value
        let oldVal = this.value; // 获取原有的value值
        if (value !== oldVal) {
            this.value = value; // 把新值更新一下
            this.cb.call(this.vm, value);  // 值不同, 则调用Watcher执行, 把新的值传过去
        }
    },
    get: function() {
        Dep.target = this;
        let value = this.vm.data[this.exp];// 强制执行Object.defineProperty里的get方法, 把观察者添加到Dep订阅者数组中
        Dep.target = null;
        return value;
    }
};
// 3. 定义Vue类, 接收参数和监听的key (注意暂时这里只能接收一个key)
function Vue (options, exp){
    this.data = options.data(); // 获取data对象
    let el = document.querySelector(options['el']); // 获取el根节点
    observe(this.data); // 触发Observer监听data里所有key
    el.innerHTML = this.data[exp]; // 初始化模板数据的值
    // 实例化Watcher, 传入Vue实例对象, 以及回调函数, 还有要触发监听的key值
    // 4. Watcher执行, 更新el节点里的值
    new Watcher(this, function(value){
        el.innerHTML = value;
    }, exp);
    return this; // 5. 返回Vue实例对象
}
```
* Vue使用
``` js
<div id="app">{{userName}}</div>
<script>
// 6. 仿照Vue定义, 传入需要的参数
let app = new Vue({
    el: "#app",
    data () {
        return {
            "userName": "hello VueJS"
        }
    }
}, "userName");
setTimeout(()=>{
    app.data.userName = "漂亮";
}, 2000);
// 这时, 我们发现雏形已经出来了, 但是还有点不一样, 但是我们在控制台修改app.data.userName 确实实现了数据的绑定, 页面发生了变化.
```
[当前页源代码](https://github.com/lidongxuwork126com/ldx_vue/tree/master/%E4%BB%BFVue%E6%BA%90%E7%A0%81)
但是我们发现访问data属性必须先.data再.key, 很明显这是不行的, 看下文如何改动