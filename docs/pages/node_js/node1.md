# Node.js的一些常用方法及注意事项
### 1.path 模块 (路径模块)
 作用: 只处理文件路径字符串; <br>
 注意: 只处理文件路径的字符串,而不管该路径是否真实存在<br>
 方法:  path.basename('路径名')  : 可以得到路径的最后一部分<br>
 path.extname('路径名') :  可以得到路径最后的文件名的后缀<br>
 path.join('路径名','路径名') : 会智能的拼接路径<br>
 还会自动识别 ./ ../    例如:  path.join('a',../,'b','c')   返回的值: b/c   <br>
 node.js中的常量: __dirname, 不需要声明, 会自动的得到当前文件路径的绝对路径字符串<br>
### 2.fs模块  ----全称 file system (文件模块)
 方法:  fs.readFile() 用来读取文件<br>
 俩个参数: 第一参数为文件的路径地址, 第二个参数为callback(err,data)<br>
 注意: ,回调函数中的err参数,当为null 的时候,代表读取成功, 如果err参数返回的是一堆代码,则代表读取失败而,data参数代表读取成#### 功后文件中的数据<br>
#### 例如:
 let fs = require('fs') <br>
 fs.readFile('./add.html',function(err,data){<br>
       //err 代表错误信息 <br>
  //data 代表读取的文件中的数据,返回的是buffer编码,可以利用toString() 进行转换解析<br>
 })<br>
方法2: fs.writeFile(); 写入文件 <br>
三个参数: 第一个参数代表将要写入文件的路径, 第二个参数为传入的数据,第三个参数为callback;<br>
注意: 如果第一个参数写的路径,如果为单纯的文件路径,例如:bb.txt则该文件有没有则无所谓,没有就会自动创建,有就会覆盖;  但是如果为复杂的路径,例如: aa/bb.txt  则aa目录则必须存在才可以<br>
### 3.querystring 模块  (解析模块)
qs.stringify('')  :可以解析对象为查询字符串格式 (例:name=zs&age=1)<br>
qs.parse('')  : 把查询字符串解析为对象形式<br>
### 4.http 服务端模块(核心)
 * 搭建步骤: 
    *  引入http模块    let http = require('http')
    *  创建server对象  let server = http.createServer( );
    *  引用端口号        server.listen(3000,function(){  引入端口成功后执行的回调函数  })
    *  注册request事件   server.on('request',function(req,res)
  * 俩个参数: req, 代表request 请求 ,res , 代表response 响应  
    * res 响应 --- response:
    * res.end(); 设置响应内容,并作出响应给浏览器; ---常用   res.setHeader();设置响应头  res.statusCode=200 ; 
    * 一般不设置,默认值为200
    * res.write('') 只是设置响应, 但不会发送响应到浏览器 <br>
    * req   请求 --- request<br>
    * 俩个方法:  req.url   : 请求的url地址     <br>
    *  req.method    请求的方法 get/post<br>
    * 其中 get 请求方式--注意:参数的传递是放在url地址后面的 <br>
    * 首先得到url地址,并进行字符串的分割, req.url.split('?')<br>
    * 其次,利用qs.parse 解析 该字符串为对象形式<br>
    * post请求方式--注意:post传递参数是在请求体中传递的<br>
    * 在request事件中,回调函数中在执行俩个事件<br>
    *  一个是data事件,一个是end事件和data事件,代表数据参数正则传递的过程中<br>
    * 其中info,就代表传递的参数,是一段一段进行传递的,所以最后要拼接起来<br>
    * str+=info;end事件,代表接受数据结束事件之后执行的回调函数<br>
    * server.on('request',function(req,res){<br>
        let str=""<br>
       req.on('data',function(info){<br>
       str+=info //把一段一段的数据拼接起来<br>
       req.on('end',function()} 数据传输完成之后,才执行end事件中的回调函数<br>
    * 注意:以上req中的方法,只有在request事件里面才拥有
