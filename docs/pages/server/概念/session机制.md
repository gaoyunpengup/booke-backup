## session是什么
1. session技术就是一种基于后端有别于数据库的临时存储数据的技术  
2. session保存的位置是在服务器端磁盘上/临时cookie中
3. session一般来说是要配合cookie使用，如果是浏览器禁用了cookie功能，也就只能够使用URL重写来实现session存储的功能(/在后端使用磁盘文件来管理)
4. 单纯的使用session来维持用户状态的话，用户数量较多的时候，session会导致查询慢的问题
5. 如果后端是分布式服务器的话, session还需要自己手动同步, 很麻烦
## 为什么有session
1. 因为http无状态性, 我们需要使用cookie配合session来检查用户的状态
2. 或保存一些频繁使用的信息, (查询数据库没有session的速度快)
## session存储的位置
1. node使用express-session是和cookie配合, 如果服务器重启session就会失效
2. session持久化问题, 可以采用文件进行session存储管理
