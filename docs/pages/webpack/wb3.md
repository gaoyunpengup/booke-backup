### webpack修改配置操作-----webpack.config.js
##### 1.修改webpack.config.js中的默认入口配置以及出口配置 <br>
* 俩个参数:   entry 代表入口 路径  <br>
* output: 代表出口, 其中需要引入node内置模块path,查找路径,<br>
* 由于webpack就是在node环境下的,所以导出模块直接用 moduel.export={ } 就可以<br>
例如:<br>
```js
let path = require('path')
module.export={
    entry:'./src/index.js' , //入口文件代表在src文件夹下,的index.js中进行打包
  output:{
    path:path.resolve(__dirname,'dist') //在当前的绝对路径下的dist文件夹下作为出口
    filename:'buller.js' //在该js文件夹中显示打包后的文件内容
  }
}
```
#### 注意: 打包的时候,只要跟入口文件index.js有关联的,就都必须进行相关配置才可以打包
##### 2.自动生成html文件,并且自动匹配更新,同步到自己写的index.html中的代码来显示
* 下载html-webpack-plugin -D      -D 代表在开发环境中配置, 上线环境的时候就不用加载到服务器中了
* 引入第三方插件    let HtmlWebpackPlugin= require('html-webpack-plugin')
* 设置 
```js
plugins:[new HtmlWebpackPlugin(
		{ template: ' ./模版路径' })     -----模版路径代表自己的写html文件同步
------ template  模板
```
##### 3.css文件处理
下载 css-loader   和 style-loader 加载器
```js
 module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
```
 ##### 4.less文件处理
   * 下载 less-loader 加载器
   * 如果有css文件,就需要加上style-loader,css-loader
```js
{
     test: /\.less$/i,
     use: ["style-loader", "css-loader","less-loader"],
  },
```
##### 5.图片文件处理
* 创建项目的时候,静态文件资源一般都创建assets文件夹下,
* 下载 url-loader, file-loader加载器
* 其中 url-loader的作用: 是把文件转换为base64字符的字符串
* file-loader的作用:直接把文件输出到出口文件/dist/文件夹下
```js
{
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,  //limit的作用是:设置打包文件的大小,如果超过8字节,就直接放到/dist目录下
                                    //如果小于8字节,就通过url-loader 打包为64base字符串图片格式                        
            },
          },
        ],
      },
```
* limit的作用: 设置默认打包图片的数据大小,因为当图片转换为base64格式的时候,会默认增长原数据大小的30%,
* 所以,当图片过大的而进行打包就会有所影响服务器加载等,
##### 6.字体图标处理
* 还是用到url-loader 加载器, 只需改变正则匹配的规则即可
```js
{
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,  //limit的作用是:设置打包文件的大小,如果超过8字节,就直接放到/dist目录下
                                    //如果小于8字节,就通过url-loader 打包为64base字符串图片格式                        
            },
          },
        ],
      },
```
##### 7.音频,视频,等文件处理,都是用url-loader (专门处理静态资源的模块) 只需改变text属性中的匹配规则即可
##### 8.高级JS降级处理
* 注意: 通过import引入的js文件打包之后,是通过其import功能来自动处理降级的
* 那么js 需要手动配置来处理高级js降级处理方式
* 在babel-loader 中查看配置:
* 安装: babel-loader @babel/core @babel/preset-env 模块
```js
      {
      test: /\.m?js$/,  //识别js文件和mjs文件
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
```
### 插件
* 插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
* Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。
* Webpack有很多内置插件，同时也有很多第三方插件，可以让我们完成更加丰富的功能。
#### webpack中提供的优化插件
* Hot Module Replacement
  * 作用:它允许你在修改组件代码后，自动刷新实时预览修改后的效果
* HtmlWebpackPlugin
  * 帮你生成最终的Html5文件，这个文件中自动引用了你打包后的JS文件
* OccurenceOrderPlugin :
  * 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
* UglifyJsPlugin：
  * 压缩JS代码；
* ExtractTextPlugin：
  * 分离CSS和JS文件

### 辅助工具 source-map的作用
* 用来记录错误信息的行数的
* 在package.json中进行配置
* 开发环境推荐: 用于测试,找错等(development)
```js
mode:"development", //webpack打包模式,不会极致压缩,适用于编写代码环境,
devtool:"cheap-module-source-map"   //devtool针对soucemap如何记录代码位置信息配置项
```
* 在出口文件下,会自动生成.map文件,保存的就是对应文件里代码的打包前的位置信息
* 上线环境推荐:
```js
mode:"production",
devtool:"source-map"
```
#### 推荐表:
#### <img :src="$withBase('/img/wb2.png')" alt="foo"> 