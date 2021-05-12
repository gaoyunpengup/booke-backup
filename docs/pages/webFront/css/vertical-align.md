## vertical-align详谈
> 行内元素垂直对齐方式 / 以哪条线进行对齐, 找到对齐的线就成功一半了
::: tip vertical-align的值范围
:::  
![](/webFront/screenshot_1575082385349.png)
1. 分类 
* 线类: baseline (默认值), top, middle, bottom
* 文本类: text-top, text-bottom
* 上标下标类: sub, super
* 数值百分比类, 10px, 1em, 5%
2. 针对
* 行内元素 (inline)
* 行块元素 (inline-block)
* 内联表格 (inline-table)  (类似于table)
* 表格单元格(table-cell) 
::: tip 线类图解
:::
* baseline:
![](/webFront/screenshot_1575094941744.png) <br>
* middle值讲解: 使文本垂直中线, 与基线对齐 <br>
![](/webFront/screenshot_1575085447782.png) <br>
* 红色为基线baseline
![](/webFront/screenshot_1575086186982.png) <br>
* baseline: 文字底部, 如果没有内容, 则是margin-bottom
* -32px: 向下沉降32像素
* -100%: 相对于当前标签line-height进行换算
* top: 与line-box顶端对齐
* bottom:与line-box低端对齐
* middle: 看上图, 文字中线与基线对齐
* text-top: 当前元素顶端与父元素内容(最左侧xx)的顶端 水平方向对齐
* text-bottom: 当前元素底部与父元素(最左侧xx)的底部 水平方向对齐
* sub: 下沉当前标签基线对齐
* super: 上浮当前标签基线对齐
![](/webFront/screenshot_1575087076580.png)

## vertical-align: middle; 对齐
案例: logo 和 span 标签, 想要以中线 水平对齐, 效果如下
![](/webFront/screenshot_1575095134794.png) <br>
解释: inline box 的高度 由里面最高的行内元素来决定, 而且基线也要迁就于它
* 所以只给span: vertical-align: middle;并不能影响对齐方式.
* 还需要给最高的图片设置 vertical-align: middle; 才可以
## 注意
标签设置了以下属性, vertical-align失效
* float
* position: absolute / fixed
* 父级开启了弹性盒子