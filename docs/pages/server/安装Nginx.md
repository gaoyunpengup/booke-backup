## 什么是Nginx
Nginx (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。
## 特点
1. 轻量级，采用 C 进行编写，同样的 web 服务，会占用更少的内存及资源
2. 抗并发，nginx 以 epoll and kqueue 作为开发模型，处理请求是异步非阻塞的，负载能力比 apache 高很多，而 apache 则是阻塞型的。在高并发下 nginx 能保持低资源低消耗高性能 ，而 apache 在 PHP 处理慢或者前端压力很大的情况下，很容易出现进程数飙升，从而拒绝服务的现象。
3. nginx 处理静态文件好，静态处理性能比 apache 高三倍以上
4. nginx 的设计高度模块化，编写模块相对简单
5. nginx 配置简洁，正则配置让很多事情变得简单，而且改完配置能使用 -t 测试配置有没有问题，apache 配置复杂 ，重启的时候发现配置出错了，会很崩溃
6. nginx 作为负载均衡服务器，支持 7 层负载均衡    
7. nginx 本身就是一个反向代理服务器，而且可以作为非常优秀的邮件代理服务器
8. 启动特别容易, 并且几乎可以做到 7\*24 不间断运行，即使运行数个月也不需要重新启动，还能够不间断服务的情况下进行软件版本的升级
9. 社区活跃，各种高性能模块出品迅速
## Mac上安装Ngnix
1. 查看ngnix的一些默认配置 <br>
   `$ brew info nginx` 
   ![](/server/screenshot_1555949743052.png)
2. 正式安装  <br>
   `$ brew install nginx `
3. nginx 真正安装到的位置  <br>
   `$ /usr/local/Cellar/nginx`
4. 资源文件路径  <br>
   `$ /usr/local/var/www` (可以把网页等静态资源存放在这里)
5. 启动nginx服务  <br>
   `$ nginx` (没有任何反应是正常的)
6. 访问localhost:8080, 成功了
   ![](/server/screenshot_1555951491319.png)
## 配置文件讲解
配置文件路径: /usr/local/etc/nginx/nginx.conf <br>
``` js
#user  nobody; // 运行用户, 默认即是nginx, 可不设置
worker_processes  1; // 工作进程数 一般设置和CPU内核数一样

// 错误日志存放目录
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

// 进程pid日志的位置
#pid        logs/nginx.pid;

// 工作模式以及连接上限
events {
    // 单个后台worker process进程最大并发连接数
    worker_connections  1024;
}

http {
    // 文件扩展名与类型映射表
    include       mime.types;
    // 默认文件类型
    default_type  application/octet-stream;
    // 设置日志模式 (日志格式)
    // $remote_addr 与 $http_x_forwarded_for 用以记录客户端的ip地址；
    // $remote_user ：用来记录客户端用户名称
    // $time_local ： 用来记录访问时间与时区；
    // $request ： 用来记录请求的url与http协议；
    // $status ： 用来记录请求状态；成功是200；
    // $body_bytes_s ent ：记录发送给客户端文件主体内容大小；
    // $http_referer ：用来记录从那个页面链接访问过来的；
    // $http_user_agent ：记录客户端浏览器的相关信息；

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    // nginx访问日志(并使用main 日志格式)
    #access_log  logs/access.log  main;

    // 开启高效传输模式
    sendfile        on;

    // 激活tcp_nopush参数可以允许把httpresponse header和文件的开始放在一个文件里发布，
    // 积极的作用是减少网络报文段的数量
    #tcp_nopush     on;

    // 连接超时时间，单位是秒
    keepalive_timeout  65;

    // 开启gzip压缩功能
    #gzip  on;

    // 基于域名的虚拟主机
    server {
        // 监听端口 8080
        listen       8080;
        // 监听, 连接域名 (客户端访问localhost:8080即可)
        server_name  localhost; 
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        // 请求的url过滤, /代表请求根路径.  ~区分url大小写, ~*不区分url大小写
        location / {
        // 设置资源所在根目录
            root   html;  
        // 设置默认页
            index  index.html  index.htm;
        # proxy_pass http://mysvr;  // 代理转发, 请求转向mysvr 定义的服务器列表
        # deny xx.xx.xx.xx;  // 拒绝哪些ip访问我们的Nginx服务器上资源
        # allow xx.xx.xx.xx; // 允许哪些ip访问我们的Nginx服务器上资源
        }

        // 错误页面 404
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        // 50开头状态 对应页面
        error_page   500 502 503 504  /50x.html;

        // 访问50x.html页面
        location = /50x.html {
            root   html;
        }
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        // 如果访问的是php类型的url结尾的, 转发给Apache服务器 ,默认端口:80
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        // 匹配符合php扩展名的请求
        #location ~ \.php$ {
        #    root           html;
        // 抛给本机的9000端口
        #    fastcgi_pass   127.0.0.1:9000;
        // 设定动态页
        #    fastcgi_index  index.php;
        // 脚本文件请求的路径
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        // 文件扩展名与类型映射表
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        // 允许.htaccess 开头文件执行和访问 (all允许, node禁止)
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

    // 另外一个服务器配置表
    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    // HTTPS服务相关设置
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    # 服务端证书和服务端key所在路径
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
}
``` 
## 常用命令
1. 重载nginx.conf配置
`$ nginx -s reload`
2. 重启nginx
`$ nginx -s reopen`
3. 停止nginx (强制, 未保存数据, 丢弃)
`$ nginx -s stop`
4. 退出nginx (等待处理完成, 再停止)
`$ nginx -s quit`
5. 启动nginx
`$ nginx `
> -s作用: 给一个 nginx 主进程发送信号
5. 显示版本信息
`$ nginx -v`
6. 检查配置文件是否错误
`$ nginx -t`

## 配置Nginx端口为80
1. 默认安装nginx时, 端口为8080
2. Mac要求1024及以下端口号只有root用户可使用
3. `$ sudo nginx -c /usr/local/etc/nginx/nginx.conf` (nginx配置文件, 拥有最高读写权限)
4. 修改端口号为80 <br>
   ![](/server/screenshot_1556778016735.png)
5. 重载nginx配置文件
   `$ sudo nginx -s reload`
6. 重启nginx
   `$ sudo nginx -s reopen`
