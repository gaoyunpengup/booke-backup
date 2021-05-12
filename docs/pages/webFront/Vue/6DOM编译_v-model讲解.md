### 指令v-model实现
1. 思路: 解析DOM属性, 判断是否有v-model属性, 然后执行对应代码
代码如下:
``` js
Compile.prototype = {
    nodeToFragment(el) {
        let fragment = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileElement(el) {
        let childNodes = el.childNodes;
        let self = this;
        [].slice.call(childNodes).forEach(function (node) {
            let reg = /\{\{(.*)\}\}/;
            let text = node.textContent;
            // 1. 判断当前DOM是否是标签
            if (self.isElementNode(node)) {
                self.compile(node);
            } else if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1]);
            }
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        })
    },
    compileText(node, exp) {
        let self = this;
        let initText = this.vm[exp];
        self.updateText(node, initText);
        new Watcher(this.vm, function (val) {
            self.updateText(node, val);
        }, exp);
    },
    updateText(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    isTextNode: function (node) {
        return node.nodeType == 3;
    },
    // 2. 判断是否是标签节点
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    // 3. 解析虚拟DOM节点属性值
    compile(node) {
        // 拿到这个标签所有属性
        let nodeAttrs = node.attributes;
        let self = this;
        // 遍历标签属性集合
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            // 拿出每个属性的名字
            let attrName = attr.name;
            // 4. 判断属性是否是v-开头的
            if (self.isDirective(attrName)) {
                // 拿到属性对应的值
                let exp = attr.value;
                // 6. 截取掉v-开头2个字符
                let dir = attrName.substring(2);
                // 7. 看看是否剩下model字符串
                if (self.isModelDirective(dir)) {
                    // 9. 注册watcher监听器
                    self.compileModel(node, self.vm, exp);
                }
                // 15. 删除v-model属性
                node.removeAttribute(attrName);
            }
        });
    },
    // 5. 判断是否以v-开头字符串
    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    // 8. 判断是否是model开头的字符串 (v-model)
    isModelDirective: function (dir) {
        return dir.indexOf('model') === 0;
    },
    // 10. v-model指令解析
    // 标签, Vue实例, key值
    compileModel: function (node, vm, exp) {
        let self = this;
        let val = this.vm[exp]; // 监听的value是多少
        // 11. 初始化表单的值
        this.modelUpdater(node, val);
        // 13. 注册监听器
        new Watcher(this.vm, function (value) {
            // 监听器触发, 则更新表单的值
            self.modelUpdater(node, value);
        }, exp);
        // 14. 给表单标签绑定input事件(这也是为什么不是所有标签都可以使用v-model的原因)
        node.addEventListener('input', function(e) {
            // 获取表单最新的值
            let newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            // 同步model里的值
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    // 12. model更新表单的值
    modelUpdater: function(node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
};
function Vue(options, exp) {
    this.data = options.data();
    let self = this;
    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });
    observe(this.data);
    // 8. 操作DOM部分交给Compile处理
    new Compile(options.el, this);
    // 9. 给Vue挂载mounted方法
    options.mounted.call(this);
}
Vue.prototype = {
    proxyKeys: function (key) {
        let self = this;
        Object.defineProperty(this, key, {
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal
            }
        })
    }
}
```
* Vue使用
``` js
<div id="app">
    <h1>{{userName}}</h1>
    <input type="text" v-model="userName">
</div>
<script>
    new Vue({
        el: "#app",
        data() {
            return {
                "userName": "hello VueJS"
            }
        },
        mounted() {
            setTimeout(() => {
                this.userName = "漂亮";
            }, 2000);
        }
    });
</script>
```
[当前页源代码](https://github.com/lidongxuwork126com/ldx_vue/tree/master/%E4%BB%BFVue%E6%BA%90%E7%A0%81)
接下来我们再讲讲事件绑定, 怎么回事吧, 看下个文章