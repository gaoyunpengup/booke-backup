### 数据绑定
* 发布者-订阅者模式(backbone.js)
* 脏值检查(Angular.js)
* 数据劫持(观察者)+发布者-订阅者模式 (Vue.js)
### Observer的定义
``` js
// 1. 属性拦截函数
function myObjectDefinePropery(data, key, val) {
    // 2. 如果val还是个对象, 就继续递归遍历它的所有key, 直到是基础的数据类型
    if (val && typeof val === 'object') {
        observe(val);
        return;
    }
    // 3. 拦截对象的key的set和get方法
    Object.defineProperty(data, key, {
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log(key+"被改变了");
            val = newVal;
        }
    });
}
// 4. 遍历对象所有key, 给他们绑定set/get方法
function observe(data) {
    Object.keys(data).forEach(function(key) {
        myObjectDefinePropery(data, key, data[key]);
    });
}
/*********************************************************/
// 使用:
// 5. 定义model数据
let model = {
    obj: {
        userName: ''
    },
    obj2: ''
};
// 6. 绑定劫持set/get方法
observe(model);
// 7. 触发set方法
model.obj.userName = '李东旭';
model.obj2 = '你好啊';
// 8. 触发get方法
console.log(model.obj2);
```
[当前页源代码](https://github.com/lidongxuwork126com/ldx_vue/tree/master/%E4%BB%BFVue%E6%BA%90%E7%A0%81) <br>

数据监听可以实现了 <br>
但是model改变时, 我们要怎么在DOM上进行更新呢, 看下一个文章