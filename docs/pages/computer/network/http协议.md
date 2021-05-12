## 什么是HTTP协议
1. 超文本传输协议, 定义服务器和客户端的传送协议
2. HTTP是基于TCP/IP协议来传输数据的, 客户端请求, 服务器响应
## HTTP协议特点?
1. 简单快速, 只传送请求方法和路径
2. 灵活, 允许传输任意类型数据对象, 只需要在请求头加入Content-Type标记
3. 无长连接, 每次请求和响应结束即会断开.
4. 无状态, 代表后面再处理某些参数, 需要进行重新传输.
5. 支持 客户端/服务器 或者 浏览器/服务器 模式
6. 如果支持长连接TCP, 会有队头阻塞问题 <br>
共用一个 TCP 连接，同一时刻只能处理一个请求，那么当前请求耗时过长的情况下，其它的请求只能处于阻塞状态(浏览器默认开启6个任务队列在一个域名上, 可以设置二级/三级域名多设置几个(但是注意会有跨域问题))
## HTTP之URL
URL 统一资源定位符 <br>
URL: `http://www.lidongxu.com:8080/news/index.php?id=5&uid=24618&page=1#name` 包含以下几部分 <br>
1. 协议部分: 有http, https, ftp等
2. 域名部分: www.lidongxu.com, www代表顶级域名, 也可以使用ip地址作为域名
3. 端口部分: 作为本服务器提供的一个服务功能(80/8080 web端口, 3306mysql端口等)
4. 目录部分: 从域名和端口号后每个/都代表一个目录
5. 文件名部分: 最后一个/和?之间的即是文件名, 如果没有说明默认找的是index
6. 参数部分: 从?往后到#之间, 都是传递给这个url的参数, 格式是key=value&key=value
7. 锚部分: 一般用于锚点链接或者某些路由框架里的路由设置.
## HTTP之Request (请求报文)
1.请求里包含: (请求行, 请求头, 空行, 请求数据) <br>
![](/computer/screenshot_1554012488815.png) <br>
2. 例如: (利用抓包工具查看的结果)(或者后台的日志文件里)
``` js
POST /work/1.php HTTP1.1
Host:www.wrox.com
User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET 
CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
Content-Type:application/x-www-form-urlencoded
Content-Length:40
Connection: Keep-Alive

name=Professional%20Ajax&publisher=Wiley
```
3. 看浏览器请求都发送了哪些东西给目标Url(后台)
* 第1行代码, 请求方法(POST), URL(/work/1.php), 协议版本HTTP1.1
* 第2, 3, 4, 5, 6, 7行代码, 请求头代码, 头部字段名: 对应的值
* 第8行代码, 代表空行 (必须有的), 用于区分头部和实体 <span style="color: red">如在请求头中加入空行, 会把下面的请求头认为是实体(不要这样)</span>
* 第9行代码, 请求发送的数据
## HTTP之Response (响应报文)
1. 服务器会向客户端/浏览器作出响应
2. 响应里包括: (状态行, 消息报头, 空行, 响应正文)
3. 例如:
``` js
HTTP/1.1 200 OK
Date: Fri, 22 May 2009 06:07:21 GMT
Content-Type: text/html; charset=UTF-8

<html>
    <head></head>
    <body>
        <!--body goes here-->
    </body>
</html>
```
4. 如上例子解释:
* 第1行代码, 响应状态行, 协议, 响应状态码, 响应状态消息
* 第2, 3行, 消息报头, 服务端返回给客户端使用的一些消息
* 第4行, 空行(用于区分头部和实体)
* 第5行, 服务器给客户端/浏览器, 返回的正文数据

## HTTP之状态码
1. 1xx: 客户端应当继续发送请求
2. 2xx: 代表请求已成功被服务器接收、理解、并接受
3. 3xx: 重定向, 浏览器发起的请求在后台被重定向到另外一个地址了, 但是浏览器不知道过程
4. 4xx: 客户端错误, 请求错误
5. 5xx: 服务端无法正确处理请求, 响应错误
6. 常用状态码如下: <br>
(1): 200: 客户端请求成功 <br>
(2): 400: 语义错误, 无法被服务器理解, 请求参数有误 <br>
(3): 401: 请求需要用户验证, 包含了 Authorization 证书, 但是被服务器拒绝了 <br>
(4): 403: 服务器已经理解请求, 但是拒绝执行它 <br>
(5): 404: 请求url不存在 (一般常见于请求路径拼写错误) <br>
(6): 500: 服务器遇到了一个未曾预料的请求, 一般出现在后台代码报错 <br>
(7): 502: 网关或者代理服务器请求时, 从服务器接收到了一个无效响应 <br>
(8): 503: 服务器过载, 当前无法完成响应, 拒绝客户端连接 <br>
(9): 504: 网关或者代理服务器请求时, 等待响应超时了 <br>
[HTTP状态码_百度百科](https://baike.baidu.com/item/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/5053660?fr=aladdin)
## HTTP之请求方法
HTTP1.0, 三种请求方法： GET   POST   HEAD <br>
HTTP1.1, 新增五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法 <br>
``` js
GET        请求指定页面, 并返回目标实体上数据
HEAD       类似于GET请求，只不过返回的响应中没有具体的内容，用于获取报头(不常用)
POST       向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中

PUT        从客户端向服务器传送的数据取代指定的文档的内容
DELETE     请求服务器删除指定的页面
CONNECT    HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器
OPTIONS    允许客户端查看服务器的性能
TRACE      回显服务器收到的请求，主要用于测试或诊断
```
## HTTP协议缺点
1. 通信使用明文不对数据进行加密（内容容易被窃听）
2. 不验证通信方身份（容易伪装）
3. 无法确定报文完整性（内容易被篡改）

## 请求头常用字段
![](/computer/screenshot_1555862592381.png)
1. 请求体内容定长: Content-Length: 12, 设置请求体中内容长度(如果长度不匹配导致发送失败)
2. 请求体内容不定长: Transfer-Encoding: chunked <br>
表示分块传输数据，设置这个字段后会自动产生两个效果:
* Content-Length 字段会被忽略
* 基于长连接持续推送动态内容

## 响应头常用字段
![](/computer/screenshot_1555862604630.png)

## 字段总结
1. 字段名不区分大小写
2. 字段名不许出现空格 或 下划线_
3. 字段名后面必须紧跟着:
* Accept：告诉WEB服务器自己接受什么介质类型，/ 表示任何类型，type/* 表示该类型下的所有子类型，type/sub-type。
* Accept-Charset： 浏览器申明自己接收的字符集 
* Accept-Encoding： 浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate） 

* Accept-Language：浏览器申明自己接收的语言 语言跟字符集的区别：中文是语言，中文有多种字符集，比如big5，gb2312，gbk等等。
* Accept-Ranges：当响应文件几百兆/几个G时, WEB服务器表明自己是否接受获取其某个实体的一部分（比如文件的一部分）的请求。bytes：表示接受，none：表示不接受。
* Age：当代理服务器用自己缓存的实体去响应请求时，用该头部表明该实体从产生到现在经过多长时间了。
* Authorization：当客户端接收到来自WEB服务器的 WWW-Authenticate  响应时，用该头部来回应自己的身份验证信息给WEB服务器。
* Cache-Control：请求：
    * no-cache（不要缓存的实体，要求现在从WEB服务器去取） 
    * max-age：（只接受 Age 值小于 max-age 值，并且没有过期的对象） 
    * max-stale：（可以接受过去的对象，但是过期时间必须小于 max-stale 值） 
    * min-fresh：（接受其新鲜生命期大于其当前 Age 跟 min-fresh 值之和的缓存对象） 
    下面是响应相关
    * public(可以用 Cached 内容回应任何用户) 
    * private（只能用缓存内容回应先前请求该内容的那个用户） 
    * no-cache（可以缓存，但是只有在跟WEB服务器验证了其有效后，才能返回给客户端） 
    * max-age：（本响应包含的对象的过期时间）
* Connection：
    * close（告诉WEB服务器或者代理服务器，在完成本次请求的响应后，断开连接，不要等待本次连接的后续请求了）
    * keepalive（告诉WEB服务器或者代理服务器，在完成本次请求的响应后，保持连接，等待本次连接的后续请求）
    下面是响应的
    * 响应：close（连接已经关闭）
    * keepalive（连接保持着，在等待本次连接的后续请求）
  
 * Keep-Alive：如果浏览器请求保持连接，则该头部表明希望 WEB 服务器保持连接多长时间（秒）例如：Keep-Alive：300
* Content-Encoding：WEB服务器表明自己使用了什么压缩方法（gzip，deflate）压缩响应中的对象。例如：Content-Encoding：gzip
* Content-Language：WEB 服务器告诉浏览器自己响应的对象的语言。
* Content-Length： WEB 服务器告诉浏览器自己响应的对象的长度。例如：Content-Length: 26012
* Content-Range： WEB 服务器表明该响应包含的部分对象为整个对象的哪个部分。例如：Content-Range: bytes 21010-47021/47022
* Content-Type： WEB 服务器告诉浏览器自己响应的对象的类型。例如：Content-Type：application/xml
* ETag：就是一个对象（比如URL）的标志值，就一个对象而言，比如一个 html 文件，如果被修改了，其 Etag 也会别修改，所以ETag 的作用跟 Last-Modified 的作用差不多，主要供 WEB 服务器判断一个对象是否改变了。比如前一次请求某个 html 文件时，获得了其 ETag，当这次又请求这个文件时，浏览器就会把先前获得的 ETag 值发送给WEB 服务器，然后 WEB 服务器会把这个 ETag 跟该文件的当前 ETag 进行对比，然后就知道这个文件有没有改变了。
* Expired：WEB服务器表明该实体将在什么时候过期，对于过期了的对象，只有在跟WEB服务器验证了其有效性后，才能用来响应客户请求。是 HTTP/1.0 的头部。例如：Expires：Sat, 23 May 2009 10:02:12 GMT
* Host：客户端指定自己想访问的WEB服务器的域名/IP 地址和端口号。例如：Host：rss.sina.com.cn
* If-Match：如果对象的 ETag 没有改变，其实也就意味著对象没有改变，才执行请求的动作。
* If-None-Match：如果对象的 ETag 改变了，其实也就意味著对象也改变了，才执行请求的动作。
* If-Modified-Since：如果请求的对象在该头部指定的时间之后修改了，才执行请求的动作（比如返回对象），否则返回代码304，告诉浏览器 该对象没有修改。例如：If-Modified-Since：Thu, 10 Apr 2008 09:14:42 GMT
* If-Unmodified-Since：如果请求的对象在该头部指定的时间之后没修改过，才执行请求的动作（比如返回对象）。
* If-Range：浏览器告诉 WEB 服务器，如果我请求的对象没有改变，就把我缺少的部分给我，如果对象改变了，就把整个对象给我。浏览器通过发送请求对象的 ETag 或者 自己所知道的最后修改时间给 WEB 服务器，让其判断对象是否改变了。总是跟 Range 头部一起使用。
* Last-Modified：WEB 服务器认为对象的最后修改时间，比如文件的最后修改时间，动态页面的最后产生时间等等。例如：Last-Modified：Tue, 06 May 2008 02:42:43 GMT
* Location：WEB 服务器告诉浏览器，试图访问的对象已经被移到别的位置了，到该头部指定的位置去取。例如：Location：http://i0.sinaimg.cn/dy/deco/2008/0528/sinahome_0803_ws_005_text_0.gif
* Pramga：主要使用 Pramga: no-cache，相当于 Cache-Control： no-cache。例如：Pragma：no-cache
* Proxy-Authenticate： 代理服务器响应浏览器，要求其提供代理身份验证信息。Proxy-Authorization：浏览器响应代理服务器的身份验证请求，提供自己的身份信息。
* Range：浏览器（比如 Flashget 多线程下载时）告诉 WEB 服务器自己想取对象的哪部分。例如：Range: bytes=1173546-
* Referer：浏览器向 WEB 服务器表明自己是从哪个 网页/URL 获得/点击 当前请求中的网址/URL。例如：Referer：http://www.sina.com/
* Server: WEB 服务器表明自己是什么软件及版本等信息。例如：Server：Apache/2.0.61 (Unix)
* User-Agent: 浏览器表明自己的身份（是哪种浏览器）。例如：User-Agent：Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.8.1.14) Gecko/20080404 Firefox/2、0、0、14
* Transfer-Encoding: WEB 服务器表明自己对本响应消息体（不是消息体里面的对象）作了怎样的编码，比如是否分块（chunked）。例如：Transfer-Encoding: chunked
* Vary: WEB服务器用该头部的内容告诉 Cache 服务器，在什么条件下才能用本响应所返回的对象响应后续的请求。假如源WEB服务器在接到第一个请求消息时，其响应消息的头部为：Content- Encoding: gzip; Vary: Content-Encoding那么 Cache 服务器会分析后续请求消息的头部，检查其 Accept-Encoding，是否跟先前响应的 Vary 头部值一致，即是否使用相同的内容编码方法，这样就可以防止 Cache 服务器用自己 Cache 里面压缩后的实体响应给不具备解压能力的浏览器。例如：Vary：Accept-Encoding
* Via： 列出从客户端到 OCS 或者相反方向的响应经过了哪些代理服务器，他们用什么协议（和版本）发送的请求。当客户端请求到达第一个代理服务器时，该服务器会在自己发出的请求里面添 加 Via 头部，并填上自己的相关信息，当下一个代理服务器收到第一个代理服务器的请求时，会在自己发出的请求里面复制前一个代理服务器的请求的Via 头部，并把自己的相关信息加到后面，以此类推，当 OCS 收到最后一个代理服务器的请求时，检查 Via 头部，就知道该请求所经过的路由。例如：Via：1.0 236.D0707195.sina.com.cn:80 (squid/2.6.STABLE13)

## 工作过程
1. 客户端/浏览器, 发送HTTP请求
2. 客户端TCP进行三次握手, 连接到服务器端
3. 服务器接收HTTP请求, 并根据请求方法和URL以及参数, 作出不同的HTTP响应
4. TCP进行四次挥手, 释放TCP连接
5. 客户端解析服务器端返回的内容, 并显示

## TCP三次握手
1. 客户端  ->  (请求建立链接)   ->  服务端
2. 客户端  <-  (确认建立链接)   <-  服务端
3. 客户端  ->  (确认链接over)   ->  服务端
接下来就可以愉快的传输数据了
![](/computer/screenshot_1554016572826.png)

## TCP四次挥手
1. 客户端  ->  (请求关闭链接)          ->  服务端
2. 客户端  <-  (确认关闭链接请求)      <-  服务端
3. 客户端  <-  (确认关闭链接)          <-  服务端
4. 客户端  ->  (确认关闭链接)          ->  服务端
再见, 下次再见(如果服务器HTTP协议不支持长连接就断开了)
![](/computer/screenshot_1554016592075.png)

## HTTP1.1协议 长连接
本协议, 默认设置请求头部Connection为keep-alive
保持的是TCP一直连接, 而非HTTP连接
但是需要服务器端, 支持长连接(可见响应头Connection)
这样多次发起http请求资源, 会复用TCP连接

## HTTP跨域处理
1. 当Ajax发送请求时, 所在的协议/域名(ip)/端口号, 和要请求的目标的协议/域名(ip)/端口号有一个不一样的, 就发生跨域.
2. 注意其实请求和响应都成功了, 但是在主线程检查是否跨域时, 并且响应头里是否有CORS(如果没有), 则丢弃全部的响应内容, 不会传给JS渲染引擎
处理跨域[CORS](/pages/webFront/%E6%B5%8F%E8%A7%88%E5%99%A8/CORS.html#cors%E7%AE%80%E4%BB%8B)
