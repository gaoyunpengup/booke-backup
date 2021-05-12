## Apache简介
Apache HTTP Server, 开放源码的网页服务器, 是最流行的Web服务器端软件之一
## 特点

1. apache 的 rewrite 比 nginx 强大，在 rewrite 频繁的情况下，用 apache
2. apache 发展到现在，模块超多，基本想到的都可以找到
3. apache 更为成熟，少 bug ，nginx 的 bug 相对较多
4. apache 超稳定
5. apache 对 PHP 支持比较简单，nginx 需要配合其他后端用
6. apache 在处理动态请求有优势，nginx 在这方面是鸡肋，一般动态请求要 apache 去做，nginx 适合静态和反向。
7. apache 仍然是目前的主流，拥有丰富的特性，成熟的技术和开发社区

## 开启Apache跨域支持
1. linux: apache目录下找到etc/httpd.conf配置文件 <br>
2. windows: xampp/apache/conf/httpd.conf配置文件 <br>
如果要对服务器所有静态资源进行设置, 则在如下添加即可 <br>
``` js
<Directory "/opt/lampp/htdocs">
    AllowOverride All
	Header add Access-Control-Allow-Origin *
	Header add Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE"
	Header add Access-Control-Allow-Headers "Content-Type"
    Require all granted
</Directory>
```
* /opt/lampp/htdocs 是存放web服务器所有静态资源的位置(可以根据需求更改)
* AllowOverride: 指明Apache服务器是否去找.htacess文件作为配置文件，如果设置为none,那 么服务器将忽略.htacess文件，如果设置为All,那么所有在.htaccess文件里有的指令都将被重写
* Require all granted: 允许所有请求, 访问资源
* Header add  添加响应头, 参数  和 值
    * Access-Control-Allow-Origin  允许连接的请求源  * 代表所有
    * Access-Control-Allow-Methods 允许连接的请求方法
    * Access-Control-Allow-Headers 允许连接时, 携带的请求头字段 
## 注意
这里会与代码层面的响应头设置 重叠, 所以只设置一个就可以