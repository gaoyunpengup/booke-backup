## 获取DOM方式
* getElementById() 返回 Element对象
* getElementsByTagName() 返回HTMLCollection集合
* getElementsByClassName() 返回HTMLCollection集合
* getElementsByName() 返回NodeList集合
* querySelect() 返回Element对象
* querySelectAll() 返回NodeList集合
* childNodes 返回NodeList集合
## HTMLCollection
摘自MDN解释: <br>
HTMLCollection 表示一个包含了元素（元素顺序为文档流中的顺序）的通用集合 <br>
HTMLCollection 是即时更新的；当其所包含的文档结构发生改变时，它包含的元素, 会自动更新同步<br>
效果如下, 当删除按钮后, 打印HTMLCollection结果, 是变化的
![](/webFront/Snipaste_2020-04-15_22-21-51.png) <br>
代码如下:

``` js
<button title="btn1">1</button>
<button title="btn2">2</button>
<button title="btn3">3</button>
<button title="btn4">4</button>
<button title="btn5">5</button>
<button title="btn6">6</button>
<button title="btn7">7</button>
<button title="btn8">8</button>
<button title="btn9">9</button>
<button title="btn10">10</button>

let btnCollection = document.getElementsByTagName("button");
Array.from(btnCollection).map(el => {
    el.onclick = function(){
        el.remove();
        console.log(btnCollection);
    }
})
console.log(btnCollection);
```
## NodeList
摘自MDN解释: <br>
NodeList 对象是一个节点的集合，是由 Node.childNodes 和 document.querySelectorAll 返回的。<br>NodeList 是一个静态集合, DOM改变不会影响它的结果 <br>但是childNodes结果特殊, 是动态的 <br>

案例效果如下, querySelectAll返回的NodeList是静态的, childNodes是动态的
![](/webFront/Snipaste_2020-04-15_22-28-56.png)
代码如下:

``` js
// childNodes获取所有节点, 防止杂乱, 删除所有无用节点
<button title="btn1"></button><button title="btn2"></button><button title="btn3"></button><button title="btn4"></button><button title="btn5"></button><button title="btn6"></button><button title="btn7"></button><button title="btn8"></button><button title="btn9"></button><button title="btn10"></button>

let btnCollection = document.querySelectorAll("button");
    Array.from(btnCollection).map(el => {
        el.onclick = function(){
            el.remove();
            console.log(btnCollection);
            console.log(document.body.childNodes);
        }
    })
console.log(btnCollection);
```
## 总结
1. HTMLCollection默认是动态的集合
2. NodeList默认是静态的集合, (childNodes属性特殊, 是动态的)
3. 建议在循环时, 使用HTMLCollection集合的结果, 或者把它们拷贝到数组中缓存起来
