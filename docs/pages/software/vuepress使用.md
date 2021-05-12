## 简介
Vuepress 是一个靠vue驱动的静态网页生成器, 可以把.md文件内容按照导航分类成对应的html网页, 一般可以用来开发技术文档和博客网站 <br>
[Vuepress官网](https://www.vuepress.cn/)
> 建议你有vuecli等vue基础再来使用此文档
## 目录准备
1. 全局安装vuepress模块
``` js
npm i vuepress - g
```
2. 创建项目目录(并且进入此目录)
``` js
mkdir lidongxu_blog && cd lidongxu_blog
```
3. 创建代码目录(所有资源存在在这里)
``` js
mkdir docs
```
4. 初始化项目目录的npm环境
``` js
npm init -y
```
生成package.json文件, 加入下面配置到此文件中 <br>
这里的docs对应上面第3步的docs(存放所有相关资料的文件夹)<br>
``` js
"scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
}
```
![](/software/Snipaste_2020-06-19_19-24-51.png) <br>
命令解释:
* npm run dev  (用于启动编写环境服务器和预览)
* npm run build (打包生成html网页, 会放到docs/.vuepress/dist这个路径下, 用于部署到线上环境)
5. 配置文件夹结构(每个都有自己独立的作用) <br>
![](/software/Snipaste_2020-06-19_19-39-07.png) <br>
## 博客首页
lidongxu_blog/docs/README.md内容
``` js
home: true // 开启首页
heroImage: /logo_ci.png // 首页logo
# heroText: 爱生活, 爱人生 // 主标题, 加#注释的意思
tagline: 总结使人进步 // 副标题
actionText: 快速拥有博客 → // 主页按钮文字 (如果不要主页按钮这两行可以注释掉)
actionLink: /pages/software/vuepress使用.md // 点击按钮跳转路径(page为/开始)
features: // 底部简介
- title: 爱技术
  details: 始终相信技术可以改变这个世界, 我愿意为这个世界贡献自己一份微不足道的力量
- title: 爱生活
  details: 走出去, 拥抱自然, 感受自然, 遇见不同的人, 学习他们身上的优点, 要学会谦虚
- title: 爱分享
  details: 知识不像金钱, 知识越分享你会收获越多, 而金钱越分享会越少
footer: Love Life | Salute © 1946-Computer Dongxu Li
```
启动查看首页效果
> npm run dev
---
![](/software/Snipaste_2020-06-19_20-22-57.png)
## config.js配置
``` js
module.exports = {
    title: '学海无涯', // 博客首页标题和顶端导航左侧标签
    description: '爱分享, 爱总结, 爱进步', // meta标签里描述
    head: [ // 指定浏览器标签栏上小图标
      ['link', {
        rel: 'icon',
        href: '/logo.png' // 图片在public目录下
      }]
    ],
    extend: '@vuepress/theme-default', // 你想创建一个继承自 VuePress 默认主题的派生主题 (自定义主题-为了集成评论才使用这里)
    themeConfig: {
      logo: '/logo_ci.png', // 导航上和首页的logo
      lastUpdated: '上次更新时间', // 最后一次更新时间(默认获取git提交时间)
      // 顶部右上角导航栏
      nav: [ // 几个导航, 就有几个对象
        {
          text: 'Web前端', // 导航名字 
          items: [{ // 下拉列表选项
              text: 'JavaScript',
              link: '/pages/web/js/什么是js.md' // 点击导航, 打开对应页面
            },
            { 
              text: 'CSS',
              link: '/pages/web/css/什么是css.md' 
            }
          ]
        },
        { // 无需下拉列表的导航
          text: 'Node全栈',         
          ariaLabel: 'Node全栈', 
          link: '/pages/node/什么是nodejs.md'
        }
      ],
      // 跳转到导航对应一级分类中的--左侧(侧边栏)导航
      // 注意: key要跟nav的link路径要匹配
      sidebar: {
        '/pages/web/js/': [ // Web前端的One下属的分类
          {
            title: '运行时',
            collapsable: true,
            sidebarDepth: 1, 
            children: [ // 每个都是一个侧边栏导航(元素1是上面路径拼接后的文件名, 元素2是左侧导航的名字)
              ['什么是js.md', '什么是js'],
              ['this指向.md', 'this指向']
            ]
          },
          {
            title: '性能优化',
            collapsable: true,
            sidebarDepth: 1, 
            children: [
              ['防抖函数.md', '防抖函数']
            ]
          }
        ],
        '/pages/web/css/': [{
          title: '布局', 
          collapsable: true, 
          sidebarDepth: 1, 
          children: [
            ['弹性布局.md', '弹性布局']
          ]
        }],
        '/pages/node/': [
          {
            title: '其他',
            collapsable: true,
            children: [
              ['什么是nodejs.md', '什么是nodejs']
            ]
          },
        ],
        //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
      },
    },
    markdown: {
      lineNumbers: true, // 是否在每个代码块的左侧显示行号
    }
  }
```
## 查看完整效果
重新启动项目 <br>
访问http://localhost:8080即可查看博客项目网页 <br>
![](/software/Snipaste_2020-06-19_20-49-51.png) <br>
注意: 修改配置和目录结构等, 不会热更新, 只会热更新.md文档里的内容 <br>
注意: 如果报错, 请检查浏览器控制台报错信息

[以上产物-git地址](https://github.com/lidongxuwork126com/vuepress_template.git)





