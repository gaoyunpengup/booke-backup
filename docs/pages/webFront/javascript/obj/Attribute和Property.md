## attribute 和 property 区别
1. attribute -> HTML标签上的属性
``` html
<p id="myId" class="myclass" title="等等">
<input checked="checked" value="值">
```
2. property -> DOM上自带的属性
``` js
this.className = "";
this.children = "";
this.childNodes
this.checked
```
## 注意
1. 标签上对attribute进行赋值，会同时赋给dom的property同名属性 
2. attribute和property之间的数据绑定是单向的，attribute->property
3. 给property添加属性值, 不会同步给标签上的attribute
4. 更改property和attribute上的任意值，都会将更新反映到网页的状态中
> so, jq的prop和attr 两个方法明白区别了吧?

