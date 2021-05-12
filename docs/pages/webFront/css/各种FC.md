## 什么是FC
> w3c规定的一个概念, 决定元素如何放置, 以及和其他元素的一些关系和相互作用

|  名字   |  全称   |  解释  |
| --- | --- | --- |
|  FC   |  Formatting Context   |  格式化上下文 |
|  BFC   | Block  Formatting Context   |  块级格式化上下文 |
|  IFC   |  Inline Formatting Context   |  行内格式化上下文 |
|  GFC   | GridLayout Formatting Context   |  网格布局格式化上下文 |
|  FFC   |  Flex Formatting Context   |  自适应格式化上下文 |
## BFC
> 块格式化上下文, 是块级盒布局出现的区域, 也是浮动层元素进行交互的区域。一个独立的布局区域
1. 问题: 子元素浮动, 父级高度塌陷(无法被撑开, 子元素脱离文档流)
![](/webFront/BFC1.png)
2. 问题: 相邻div, 其中一个浮动了, 挡住了后面div, 想划清界限
![](/webFront/BFC2.png) <br>
解决: 用BFC包住浮动元素 (触发BFC方式)
    *  父级float 不为none 的任何值
    *  父级position 为 absolute / fixed
    *  父级overflow 不为 visible 的任何值 (hidden常用)
    *  父级display 为 inline-block / table-cell / table-caption / flow-root(无副作用)
## IFC
1. 规则: 左右margin撑开，上下margin并未撑开，符合IFC规范
只计算横向样式空间，不计算纵向样式空间<br>
![](/webFront/screenshot_1574251301027.png)<br>
2. 规则: IFC规定, 内容是行内元素, 水平排列由块级的, text-align决定<br>
![](/webFront/screenshot_1574251849748.png)<br>
3. 规则: float元素, 优先排列, 段落开头的大字很有用<br>
![](/webFront/screenshot_1574252264181.png)<br>
``` html
<div class="warp">
    我是一个很好看的内容 <span class="f-l">哇</span> 我是一个很好看的内容
    我是一个很好看的内容
    我是一个很好看的内容
</div>
```
``` css
.warp { 
    border: 1px solid red; 
    width: 200px; 
}
.f-l { 
    float: left; 
    font-size: 25px;
}
```
## GFC
概念:
* 网格布局, 并非表格布局, 网格有着比表格更丰富的css属性, 灵活的控制
* 可以定义网格的行和列, 变成了二维布局

触发条件:
* 设置display: grid; 得到一个独立渲染区域, 网格布局
[属性详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS\_Grid\_Layout/Basic\_Concepts\_of\_Grid\_Layout)

## FFC

触发条件:
* 设置display: flex; / display: inline-flex; 得到独立渲染区域, 弹性格式上下文环境(FFC)

规则:
* display: flex; 标签为块级元素
* display: inline-flex; 标签为行块级元素
* 子标签们都是弹性项目

