## typeof运算符
JS是弱类型语言, 在运行时会判断类型, 利用typeof可以打印出对应的类型, 使用方式
* typeof(表达式)
* typeof 变量 <br>

结果如下
|  示例   |              结果             |         运行时类型           |
|    ---    |                ---              |              ---                    |
| "ok" | string | String |
| 3 | number | Number |
| 3.1415926 | number | Number |
| true | boolean | Boolean |
| undefined | undefined |  undefined |
|  null   |  object   |  Null  |
| {} |  object |  Object |
| [] |  object |  Array |
| Symbol() | symbol |  Symbol |
| NaN | number | NaN |
| (function(){}) | function | Object  |
需要特殊记忆, null -> object, 引用都是object, NaN -> number

## typeof原理
javascript在计算机, 底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息:
* 000：对象
* 1：数值
* 100：字符串
* 110：布尔

有 2 个值比较特殊：
* undefined：用 - （−2^30）表示。
* null：对应机器码的 NULL 指针，一般是全零。

## 历史遗留问题
typeof是历史遗留的产物, 因为null判断有bug, 所以现在基本不再使用typeof判断类型, 而是采用instanceof来判断
