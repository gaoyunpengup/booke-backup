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


// 单独新建WebSocket服务
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