## Rest Client
不用编写代码, 测试url接口的一个工具 <br>
此插件可以替代postman接口调试工具等(因为postman共享项目需要收费的, 而且人员也有上限) <br>

## 下载和准备
1. 先在vscode中下载此插件
2. 工程中新建xxx.http文件(用于编写请求接口和参数, 进行接口测试)(此文件可以共享发送给他人直接使用) <br>
![](/software/Snipaste_2020-04-17_12-35-47.png) <br>

## 使用规则
1. 用三个#, 分割开不同的请求
2. 可以在顶部用`@变量名`来声明变量, 例如:`@contentType = application/json; charset=UTF-8` <br> 在具体请求时, 用双大括号使用变量
3. 参数和请求头之间必须空一行 (规定)

``` js
// 声明变量
@contentType = application/json; charset=UTF-8

// 1. GET (不带参)
GET http://ip:3000/api/bookCategoryList

### 
// 2. GET (带参数)
GET http://ip:3000/api/getLeaveMessage?page=1

###
// 3. POST- application/x-www-form-urlencoded
POST http://ip:3000/api/login
Content-Type: application/x-www-form-urlencoded; charset=UTF-8

username=lidongxu9992&password=96e79218965eb72c92a549dd5a330112

###
// 4. POST- application/json
POST http://ip:3000/api/sendMessage
Content-Type: application/json; charset=UTF-8

{"userName": "东旭", "message": "vscode插件"}

###
// 5. 带请求头和响应头(跨域时, 请提前设置后台支持自定义请求头)
POST http://ip:3000/api/getDayList
Auth: ceo

###
// 6. POST-  multipart/form-data
// 参数名 text, 对应值是 title
// 参数名 image, 对应值是图片文件(文件可以是工程中相对路径的文件)
POST http://ip:3000/api/upload
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="1.png"
Content-Type: image/png

< ./Koala.jpg
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```
## 效果
![](/software/Snipaste_2020-04-17_12-49-22.png)

## 更多规则
----
[地址](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)