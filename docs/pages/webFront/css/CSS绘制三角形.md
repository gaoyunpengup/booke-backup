## CSS绘制三角形
> 首先你要知道, border是梯形的, 而且border是占可视范围的
``` css
width: 200px;
height: 200px;
border-left: 100px solid black;
border-right: 100px solid red;
border-bottom: 100px solid yellow;
border-top: 100px solid blue;
```
![](/webFront/Snipaste_2020-03-15_13-35-56.png) <br>
如果没有了内容width和height
``` css
width: 0;
height: 0;
border-left: 100px solid black;
border-right: 100px solid red;
border-bottom: 100px solid yellow;
border-top: 100px solid blue;
```
![](/webFront/screenshot_1555747504631.png) <br>
所以只需设置其他三边为白色/transparent就可以只看到黑色三角形了
``` css
width: 0;
height: 0;
border-left: 100px solid black;
border-right: 100px solid white;
border-bottom: 100px solid white;
border-top: 100px solid white;
```
![](/webFront/screenshot_1555747650256.png)
## 拉伸三角形
其实就是设置边框的大小, 上下小一点,左边是上下边框的4倍,右侧none <br>
![](/webFront/screenshot_1582554490495.png)
``` css
width: 0;
height: 0;
border-left: 200px solid red;
border-top: 50px solid transparent;
border-bottom: 50px solid transparent;
border-right: none;
```
