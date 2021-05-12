## socket概念
主要应用在网络通信编程<br>
应用层和TCP/IP协议之间的抽象层, 有一组API接口方法调用<br>
可以在客户端/浏览器 与 服务器 之间建立一条长连接(保持连接)的通道

## 什么是WebSocket
全双工通信协议 <br>
WebSocket与HTTP都是应用层协议, 都是基于TCP协议传输数据 <br>
WebScoket依赖于HTTP进行第一次握手, 之后在TCP传输数据, 与HTTP协议无关了 <br>
默认使用ws://协议, 默认端口80 <br>
* 长连接
一个TCP连接是否为长连接, 由http请求头设置connect:keep-alive, 而且服务器端支持才可以, WebSocket内置心跳包, 可以保持长连接
* 短连接
通信双方, 发送一次报文后, 就马上断开TCP连接
* 轮询(polling)
隔固定时间, 客户端发起一次请求到服务器端, 询问是否有新的数据, 占用带宽和服务器资源 (不建议使用)

## WebSocket案例
首先node需要下载ws模块, 专用于建立WebSocket服务的<br>
ws模块的[API docs](https://www.npmjs.com/package/ws#api-docs) <br>
1. 后端代码:
``` js
const WebSocketServer = require('ws').Server, // WebSocket默认支持跨域连接
wss = new WebSocketServer({ port: 9876 }); // 配置webSocket服务器的端口号 
wss.on('connection', function (ws) { // 监听客户端的连接
    console.log('有人连接服务器');
    ws.on('message', function (message) { // 接收客户端实时推送的内容
        console.log(message);
    });
    setTimeout(()=>{
    	ws.send('服务器返回的内容'); // 向客户端主动推送消息(以前ajax的方式是办不到的)
    }, 5000);
});
```

2. 前端代码:
``` html
<body>
<div id="result">

</div>
<input type="text" id="myInput">
<button onclick="send()">发送消息</button>
<script>
    var thews = new WebSocket("ws://localhost:9876");
    thews.onopen = function (e) {
        console.log('Connection to server opened');
    }
    thews.onmessage = function (res) {
        console.log(res);
    }
    function send() {
        thews.send(document.getElementById("myInput").value);
    }
</script>
</body>
``` 
3. 效果如下:<br>
前端不光能推送消息给服务器<br>
重点是服务器端, 可以主动向客户端浏览器发送消息
 ![](/server/socket.png)

## 什么是socket.io
通用于浏览器端 + 服务器端 的一个实时通信库 <br>
底层基于engine.io, 内部对Websocket 和 XHR 的连接方式进行了封装 <br>
比上面WebSocket扩展了更多的方法和功能的使用 <br>
socket.io服务器端的[中文文档](https://www.w3cschool.cn/socket/socket-odxe2egl.html) <br>
socket.io服务器端的[英文文档](https://github.com/socketio/socket.io/blob/master/docs/API.md)<br>
socket.io客户端[中文文档](https://www.w3cschool.cn/socket/socket-k49j2eia.html)<br>
socket.io客户端[英文文档](https://github.com/socketio/socket.io-client/blob/master/docs/API.md)<br>

## socket.io案例
1. 后端代码
``` js
const express = require("express");
const app = express();
app.use(express.static("./html"));
const server = app.listen(5050);
// 1. 搭建express服务器
// 2. 下载socket.io模块 (npm i socket.io)
// 3. 引入模块, 在server服务器对象上, 注入socket.io服务
const io = require("socket.io")(server); // 得到操作socket的对象
// 4. 监听浏览器的连接事件
// 参数socket: 代表浏览器的对象信息
io.on("connect", (socket) => {
    socket.emit("link", "恭喜你, 连接上了socket服务器"); // 功能1: 向前端发送欢迎消息
    socket.on("browser_to_message", (data) => { // 功能2: 接收前端发送的消息
        // 功能3: 广播给现在所有已经连接的, 前端浏览器
        // io.sockets 遍历所有的连接者
        // io.sockets.emit("server_back_message", data);
        // 功能4: 发送给除了 主动发送消息 以外的 所有客户端
        socket.broadcast.emit("server_back_message",data);
    })
});
```
2. 前端代码
``` js
// 引用socketio的js插件
<script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js"></script>
// 2. 连接socket服务器
const socket = io("http://localhost:5050");
// 3. 监听link连接事件, 当我成功连接服务器时, 服务器会主动推送一个消息传给link事件
socket.on("link", (msg) => {
    console.log(msg);
});
function send() {
    socket.emit("browser_to_message", {
        messageText: document.getElementById("myInput").value
    });
    let theP = document.createElement("p");
    theP.innerHTML = document.getElementById("myInput").value;
    document.getElementById("result").appendChild(theP);
}
// 接收服务器端的广播消息 (服务器主动推送消息, 给浏览器)
socket.on("server_back_message", (res) => {
    let theP = document.createElement("p");
    theP.innerHTML = res['messageText'];
    document.getElementById("result").appendChild(theP);
})
```




