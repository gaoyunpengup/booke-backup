### Vue访问data修改
思路: 访问属性时, 默认去data里访问对应的key, 设置个data代理即可
代码如下:
``` js
function Vue(options, exp){
    this.data = options.data();
    let el = document.querySelector(options['el']);
    // 2. 给获取到的data下的属性, 每个key都调用代理proxyKeys, 绑定set/get方法, 使用get方法直接从data属性下去取
    let self = this;
    Object.keys(this.data).forEach(function(key){
        self.proxyKeys(key);
    });
    observe(this.data); // 给data绑定监听者
    el.innerHTML = this.data[exp];
    new Watcher(this, function(value){
        el.innerHTML = value;
    }, exp);
    return this;
}
// 1. 给Vue扩展proxyKeys, key值代理
Vue.prototype = {
    proxyKeys: function(key){
        let self = this;
        Object.defineProperty(this, key, {
            get: function(){
                return self.data[key];
            },
            set: function(newVal){
                self.data[key] = newVal
            }
        })
    }
}
```
* Vue的使用
``` js
<div id="app">{{userName}}</div>
<script>
    let app = new Vue({
        el: "#app",
        data () {
            return {
                "userName": "hello VueJS"
            }
        }
    }, "userName");

    setTimeout(()=>{
        // 3. 使用方式修改一下
        app.userName = "漂亮";
    }, 2000);
</script>
```
[当前页源代码](https://github.com/lidongxuwork126com/ldx_vue/tree/master/%E4%BB%BFVue%E6%BA%90%E7%A0%81)
我们发现, 没有解析标签中的双大括号啊, ok, 看下个文章解析声明式渲染模板