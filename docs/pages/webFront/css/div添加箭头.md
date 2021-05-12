## div加箭头
> 思路: 利用before和after伪类, 形成2个三角形摞在一起<br>

先看效果, 前提, 你会用[CSS绘制三角形](/pages/webFront/css/CSS绘制三角形.html), 还需要明白:before和:after伪类 <br>
![](/webFront/screenshot_1555747168201.png)
1. 先来一个矩形
``` css
.main_content {
    position: relative;
    width: 150px;
    height: 36px;
    border: 1px solid black;
    border-radius: 5px;
    background: #eee;
    /*无实际作用, 为了让左边留出一点空隙, 观察箭头*/
    margin-left: 50px;
}
```
![](/webFront/screenshot_1555748258020.png) <br>
2. 添加:before伪类
``` css
.main_content:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    /*三角距离顶部距离*/
    top: 8px;
    /*三角大小*/
    border: 6px solid transparent;

    /*设置三角位置, 和三角的颜色*/
    left: -12px;
    border-right-color: black;
    z-index: 0;
}
```
![](/webFront/screenshot_1555748522958.png) <br>
3. 添加:after伪类, 再来个类似三角, 不过跟背景色一样盖在上面, 少盖1px
``` css
.main_content:after{
    content: "";
    display: block;
    position: absolute;
    top: 8px;
    width: 0;
    height: 0;
    /*三角大小*/
    border: 6px solid transparent;

    /*跟背景色一样的, 注意left要少设置1px, 为了留出上面三角形一条黑边*/
    left: -11px;
    border-right-color: #eee;
    z-index: 1;
}
```
![](/webFront/screenshot_1555748642541.png)


