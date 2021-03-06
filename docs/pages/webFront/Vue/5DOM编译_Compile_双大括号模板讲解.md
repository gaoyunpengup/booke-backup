### 双大括号模板讲解_虚拟DOM_Compile
1. 这里新建Compile类, 用于处理DOM标签
2. 给Vue扩展mounted方法
代码如下:
``` js
// 1. 创建类Compile, (用于解析DOM节点), 接收根DOM和vue实例对象
function Compile(el, vm) {
    this.vm = vm; // vue实例
    this.el = document.querySelector(el); // 根DOM
    this.fragment = this.nodeToFragment(this.el); // 删除原始DOM, 生成新的虚拟DOM树
    this.compileElement(this.fragment); // 编译DOM节点特殊字符
    this.el.appendChild(this.fragment); // 把虚拟DOM添加到真正的DOM上
    // 解析DOM->初始化->编译(绑定订阅器)
}
// 2. 给Compile实例对象扩展方法
Compile.prototype = {
    nodeToFragment(el) { // 用于生成虚拟DOM
    // createDocumentFragment() 创建DOM节点, 但它不是主DOM节点一部分, 一般用法是将子元素添加到这个DOM上, 然后将DOM添加到真正的主DOM上, 因为这个创建的DOM是在内存中的.
        let fragment = document.createDocumentFragment();
        let child = el.firstChild; // 获取根节点的第一个孩子节点
        while (child) { // 递归查找所有子节点, 并且挂载到虚拟DOM上
        // 将DOM元素移入fragment中, 重点注意: 如果使用appendChid方法将原dom树中的节点添加到DocumentFragment中时，会删除原来的节点。
            fragment.appendChild(child);
            child = el.firstChild; // 所以这里获取el下的第一个孩子, 不会一直指向一个标签
        }
        return fragment; // 返回虚拟DOM
    },
    // 3. 解析虚拟DOM节点夹着的值
    compileElement(el) {
        let childNodes = el.childNodes;
        let self = this;
        [].slice.call(childNodes).forEach(function (node) { // 遍历每个DOM节点
            let reg = /\{\{(.*)\}\}/;
            let text = node.textContent;
            if (self.isTextNode(node) && reg.test(text)) {
                // 判断节点是否有内容, 而且内容是否是{{}}这种格式的
                // reg.exec(text) 提取{{}}和里面内容, 就是属性key值
                // 4. 注册文本节点监听器(并初始化值)
                self.compileText(node, reg.exec(text)[1]);
            }
            // 判断是否还有子节点, 如果有则继续递归子节点
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        })
    },
    // 5. 节点监视器
    compileText(node, exp) {
        let self = this;
        let initText = this.vm[exp];
        self.updateText(node, initText);
        // 6. 给节点新建个监视器, 监视key的变化, 变化就会回调这个function
        new Watcher(this.vm, function (val) {
            self.updateText(node, val);
        }, exp);
    },
    // 7. 更新某个节点的值
    updateText(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    // 判断是否是文本节点
    isTextNode: function (node) {
        return node.nodeType == 3;
    }
};
function Vue(options, exp){
    this.data = options.data();
    let self = this;
    Object.keys(this.data).forEach(function(key){
        self.proxyKeys(key);
    });
    observe(this.data);
    // 8. 操作DOM部分交给Compile处理
    new Compile(options.el, this);
    // 9. 给Vue挂载mounted方法
    options.mounted.call(this);
}
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
* Vue使用
``` js
<div id="app">{{userName}}</div>
<script>
    new Vue({
        el: "#app",
        data () {
            return {
                "userName": "hello VueJS"
            }
        },
        // 10. 使用mounted方法
        mounted () {
            setTimeout(()=>{
                this.userName = "漂亮";
            }, 2000);
        }
    });
</script>
```
[当前页源代码](https://github.com/lidongxuwork126com/ldx_vue/tree/master/%E4%BB%BFVue%E6%BA%90%E7%A0%81)
好了, 到这里基本上, 我们Vue的具体实现过程, 大家应该有所了解了