### WebPack和Grunt以及Gulp相比有什么特性
#### Grunt和Gulp的工作方式是：
在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。
####  Webpack的工作方式是：
把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。
##### 总结: Webpack的处理速度更快更直接，能打包更多不同类型的文件。
### 使用步骤
* 全局安装webpack  
  * npm install -g webpack
* 安装到你的项目目录
  * npm install --save-dev webpack
* 自动创建package.json文件---其作用:用来记录安装模块的版本号以及信息的
  * npm init
* 通过配置文件来使用Webpack
  * 简单配置:

```
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```
#### 更快捷的执行打包任务
使用简单的npm start命令来代替这些繁琐的命令。在package.json中对npm的脚本部分进行相关设置即可
```
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" //配置的地方就是这里啦，相当于把npm的start命令指向webpack命令
  },
  "author": "zhang",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^1.12.9"
  }
}
```