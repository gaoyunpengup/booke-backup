# express框架基本使用
  * 安装:  npm i  express  
  * package.json 里面记录的各个模块了.
  * express 框架的作用: 使我们在后端搭建服务器更加的快速,结构更加清晰.
### 基本操作步骤:
 1.引入express框架           let express =  require('express') <br>
 2.创建服务                       let  app =  express();<br>
 3.监听端口                       app.listen (3000,callback( ){ })<br>
 4.设置接口                       app.get('/路径 ',callback(req,res){    })<br>
 5.设置响应的内容            res.send();    它会自动解析JSON格式<br>
### express传递参数的获取
 1.post传递方式,和获取参数的方法: <br>
 利用中间件:   app.use(express.urlencoded( {extended:false}));<br>
 其中的req.body 就会自动获得post请求的参数(对象形式)<br>
 2.get 传递方式获取参数的方法: req.query<br>
 3.get 动态路由的方式获取参数的方法<br>
 例如: 路径为127.0.0.1:3000/:id  <br>
 那么获取传递过来id的值就为    req.params.id<br>