### v-on绑定事件
思路, 还是解析标签的属性, 如果有v-on提取事件名字, 然后底层利用addEventListener绑定对应事件
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
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    compile(node) {
        let nodeAttrs = node.attributes;
        let self = this;
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            let attrName = attr.name;
            if (self.isDirective(attrName)) {
                let exp = attr.value;
                let dir = attrName.substring(2);
                // 4. 判断是否是事件指令
                if (self.isEventDirective(dir)) {
                    // 6. 给事件进行解析
                    self.compileEvent(node, self.vm, exp, dir);
                } else if (self.isModelDirective(dir)) {
                    self.compileModel(node, self.vm, exp);
                }
                node.removeAttribute(attrName);
            }
        });
    },
    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    isModelDirective: function (dir) {
        return dir.indexOf('model') === 0;
    },
    compileModel: function (node, vm, exp) {
        let self = this;
        let val = this.vm[exp];
        this.modelUpdater(node, val);
        new Watcher(this.vm, function (value) {
            self.modelUpdater(node, value);
        }, exp);
        node.addEventListener('input', function (e) {
            let newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },
    modelUpdater: function (node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    // 5. 判断是否以on:开头的字符串
    isEventDirective: function(dir) {
        return dir.indexOf('on:') === 0;
    },
    // 7, 事件指令解析
    // DOM标签, vue对象, exp是key值, dir是事件名
    compileEvent: function (node, vm, exp, dir) {
        // 截取:后面的事件名字(例click)
        let eventType = dir.split(':')[1];
        // 获取vue实例中的methods对应的对象, 然后拿到对应的方法体
        let cb = vm.methods && vm.methods[exp];
        if (eventType && cb) {
            // 给这个DOM注册事件, eventType事件触发, 调用此方法, 传入vue例对象进去(这就是你为什么在methods中可以直接使用this代表vue对的原因)
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    },
};
function Vue(options, exp) {
    this.data = options.data();
    // 3. 绑定methods
    this.methods = options.methods;
    let self = this;
    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });
    observe(this.data);
    new Compile(options.el, this);
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
    <!--1. 使用v-on绑定click事件 -->
    <button v-on:click="btn">点我试试</button>
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
        },
        // 2. 注册methods
        methods: {
            btn() {
                this.userName = "点按钮了";
            }
        }
    });
</script>
```
[当前页源代码](https://github.com/lidongxuwork126com/ldx_vue/tree/master/%E4%BB%BFVue%E6%BA%90%E7%A0%81)