### 什么是Webpack
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行
的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
### 使用WebPack的优点
* 模块化，让我们可以把复杂的程序细化为小的文件;
* 类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且 之后还能能装换为JavaScript文件使浏览器可以识别；
* Scss，less等CSS预处理器…
### 作用
依赖关系的各种文件打包成一系列的静态资源。 请看下图：
## <img :src="$withBase('/img/wb1.png')" alt="foo"> 