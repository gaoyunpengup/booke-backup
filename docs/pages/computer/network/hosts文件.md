## hosts文件讲解
1. mac系统位置 `/private/etc/hosts`
2. windows系统位置 `C:\Windows\System32\drivers\etc\hosts`
3. 常用的网址域名与其对应的IP地址建立一个关联, 当访问url时先匹配hosts文件里的配置, 如果未命中再提交给DNS服务器进行对应IP解析, 如果命中了则直接访问对应ip地址
里面代码如下(不同系统电脑可能不同, 但是ip和域名配置是相匹配的):
``` js
# 如果报错时失败, 是因为普通用户, 没有修改此文件的权限, 给此文件设置写入权限即可(mac/windows可查询如何更改文件权限)
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	  localhost
127.0.0.1	  www.tp5.com
127.0.0.1     www.sql.com
192.168.3.106 www.lidongxu.com
0.0.0.0     account.jetbrains.com

255.255.255.255	broadcasthost
::1             localhost 
127.0.0.1 lidongxu-2.local # added by Apache Friends XAMPP
127.0.0.1 promote.cache-dns.local # added by Apache Friends XAMPP
```
> 配置规则: 当我访问入 www.sql.com 就会直接跳转到127.0.0.1
4. 所以我们一般在本机中屏蔽某些(少儿不宜的)url, 可以在这里进行一些配置, 只需要把已知的url重新指向到错误的ip地址就ok了