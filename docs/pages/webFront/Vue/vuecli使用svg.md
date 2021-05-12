## 准备工作
[直接下载代码](https://github.com/lidongxuwork126com/ldx\_vue/tree/master/Vue%E4%BD%BF%E7%94%A8svg%E5%9B%BE%E6%A0%87)
1. 项目中下载svg加载插件
`$  npm i svg-sprite-loader -save-dev`
2. 在webpack.base.conf.js中`新加入`配置module的rules
~~~ js
{
  test: /\.svg$/,
  loader: 'svg-sprite-loader',
  include: [resolve('src/icons')], // 解析目标文件夹下的svg文件
  options: {
    symbolId: 'icon-[name]'
  }
},
~~~
3. 修改module下rules配置, 加入`exclude: [resolve('src/icons')]`
~~~ js
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  exclude: [resolve('src/icons')], // 不要让url-loader解析src/icons内的.svg文件, 否则服务器跑不起来
  options: {
    limit: 10000,
    name: utils.assetsPath('img/[name].[hash:7].[ext]')
  }
},
~~~
4. 在src下, 新建如下结构 <br>
![](/webFront/screenshot_1555732681590.png) <br>
* svg文件夹下放.svg文件
* index.js代码如下:
~~~ js
import Vue from 'vue'
// 展示svg图标的, svg组件
import SvgIcon from '@/components/SvgIcon'

// 全局注册svg-icon组件
Vue.component('svg-icon', SvgIcon);

// require.context();  一次性引入
// 1.你要引入文件的目录
// 2.是否要查找该目录下的子级目录
// 3.匹配要引入的文件
const req = require.context('./svg', false, /\.svg$/);

// 加载每个.svg文件到内存中
const requireAll = requireContext => {
  // requireContext.keys() 得到数组['./look.svg', './more.svg', './voice.svg']
  requireContext.keys().map(requireContext)
};
requireAll(req);
~~~
5. 声明SvgIcon.vue组件, 代码如下
~~~ js
<!--专门加载字体图标的组件-->
<template>
  <!--$listeners是vue2.4新出, 相当于继承父标签的所有事件, .native事件不可用-->
  <!--svg标签: 绘制矢量图的 HTML5 标签-->
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <!--use标签: 配合svg标签使用, 呈现视图, href指向绘制信息(路径大小等)-->
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

~~~
6. 在main.js注入icons配置
`import "@/icons"`
## 使用
~~~ js
<svg-icon :iconClass="'voice'"></svg-icon>
~~~
----
## 扩展
> 可以自定义样式, 注意最好给font-size
~~~ js
<svg-icon :iconClass="'voice'" :className="'voice_class'"></svg-icon>
<style>
.voice_class{
  font-size: 5rem;
}
</style>
~~~
## 报错解决
1. 问题: require function is used in a way in which dependencies cannot be statically extracted(require函数不能以静态提取依赖关系)
解决: webpack.base.conf.js中module中加入 `unknownContextCritical : false`