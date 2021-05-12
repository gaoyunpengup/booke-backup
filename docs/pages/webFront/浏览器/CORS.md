## CORS简介
CORS是一个W3C标准，全称是"跨域资源共享" <br>
它允许浏览器向跨源服务器，发出`XMLHttpRequest`请求，从而克服了AJAX只能同源使用的限制 <br>
浏览器和服务器同时支持CORS, 所以如果服务器端不支持CORS, 那么浏览器还是会爆出跨域问题 (IE10+支持)
## 简单请求
请求方法:
* GET
* POST
* HEAD <br>

请求头
*   Accept
*   Accept-Language
*   Content-Language
*   Last-Event-ID
*   Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
## 简单请求_跨域问题
Ajax可以捕获异常, 抛出跨域请求的错误, 因为后台, 没有支持CORS, 设置响应头`Access-Control-Allow-Origin", "*"` <br>
![](/webFront/screenshot_1575981177669.png) <br>
后端想要支持CORS, 需要设置响应头`Access-Control-Allow-Origin", "*"` (但是仅限于简单请求哦)
![](/webFront/screenshot_1575981571427.png)

## 简单请求_响应头字段
* Access-Control-Allow-Origin 设置允许请求的浏览器端域名, *代表所有
* Access-Control-Allow-Credentials 为true 的时候, 服务器允许浏览器发送Cookie到后台, 删除此字段, 不允许携带Cookie
> 切记, 前端要设置ajaxObj.withCredentials = true 才可以让浏览器带上cookie

> 切记2: cookie还是存在同源策略, 所以不同域名后台设置cookie不生效
* Access-Control-Allow-Headers 服务器端允许客户端, 携带过来的请求头
* Access-Control-Expose-Headers 服务器端允许客户端, 拿到提取的响应头 <br>
    (默认只能拿到以下这些, 如果不设置此字段)
    * `ache-Control`
    * `Content-Language`
    * `Content-Type`
    * `Expires`
    * `Last-Modified`
    * `Pragma`
## 简单请求_跨域成功案例
1. 浏览器请求跨域资源, 请求是成功的, 看图
![](/webFront/screenshot_1575979398184.png)
2. 浏览器会在请求头添加Origin字段, 表明自己所在(协议+域名+端口), 服务器根据这个值来决定是否同意本次请求, 浏览器会接收到200正确的HTTP状态码
    * <span style="color: red">同意需要开启: 响应头:Access-Control-Allow-Origin: 同意链接的域名(*代表所有)</span>
    * 不设置, 就是不同意跨域访问
> 示例上的c.m.163.com默认是不支持跨域的, 我在谷歌浏览器上使用了CORS插件, 主要你明白, 后台只要开启了响应头(Access-Control-Allow-Origin), 我们就可以跨域访问
## 非简单请求
请求方法
* PUT
* DELETE

请求头
* 自定义名字的
## 非简单请求_OPTIONS请求
会在正式发送PUT/DELETE请求前, 发送一次OPTIONS请求. 确认下后端是否允许非简单的请求
![](/webFront/screenshot_1575986306080.png)
不允许则报错
![](/webFront/screenshot_1575986322118.png)
## 非简单请求_跨域成功
服务器端, 需要作出响应设置
* Access-Control-Allow-Methods 允许浏览器端的请求方式 例如"GET, POST, DELETE, PUT, OPTIONS"
* Access-Control-Allow-Headers 允许浏览器端发送的请求头字段 <br>

第一次OPTIONS请求, 查看响应头
![](/webFront/screenshot_1576053267637.png)
第二次, 正常发送Ajax请求, 接收结果
![](/webFront/screenshot_1576053291683.png)
## 总结
1. 浏览器同源策略, 作出的跨域限制, 但是现在浏览器支持了CORS标准, 允许跨域请求, 但是还需要后端支持CORS才可以.
2. Cookie还是存在同源策略的限制
3. JSONP只支持GET方式, 而CORS都可以支持
4. 非简单请求, 注意让后台支持. 不单单只是跨域的支持哦
5. 如果后台不支持跨域响应头设置, 前端可以采用代理服务器转发的方式, 来请求后台的接口