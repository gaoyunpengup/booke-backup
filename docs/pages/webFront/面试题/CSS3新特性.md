## CSS3
> 支持IE10+
* 选择器部分
    1. 属性选择器:  div[class*='test'] {} /*div的class包含test字符的标签们*/
    2. 伪类选择器: nth-of-type / nth-child / first-chid / last-child 等
* @font-face  加载字体, 可以是服务端字体(客户端没有的)
* border-radius: 圆角
* 多列布局 (兼容性不好, 少用)
* box-shadow: 阴影
* 渐变效果: 
    * background-image:-webkit-gradient(linear,0% 0%,100% 0%,from(#2A8BBE),to(#FE280E));
* 弹性盒子模型
* transition: 过渡特效
* transform: 变换
* animation: 动画
* word-wrap: 单词换行方式, 值:break-word
* text-overflow: 超出边界如何显示文本, 值:ellipsis 显示省略点 (需配合overflow:hidden) (在真机上会有问题, 采用JS处理)
* 支持hsl() / hsla() / rgb() / rgba() 来设置颜色 
* 定义了rem / ch / vh / vw / vmin / vmax 属性单位
