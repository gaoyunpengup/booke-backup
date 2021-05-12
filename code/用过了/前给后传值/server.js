const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.static("./"));
const formidable = require("formidable");
const url = require("url");

app.use((req, res, next) => {
    let {query} = url.parse(req.url, true);
    req.query = query;
    next();
})

// get参数
app.get("/get_v1", (req, res) => {
    res.send("你传参的结果是: " + JSON.stringify(req.query));
})

// 路径传参 
app.get("/get_v2/:id/book/:bookId", (req, res) => {
    res.send("你传参的结果是: " + JSON.stringify({id: req.params['id'], bookId: req.params['bookId']}));
})

// post方式application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
app.post("/post_v1", (req, res) => {
    res.send("post传参的结果是:" + JSON.stringify(req.body));
})

// post方式application/json
app.use(express.json());
app.post("/post_v2", (req, res) => {
    res.send("post传参的结果是:" + JSON.stringify(req.body));
})

// post方式multipart/form-data
app.post("/post_v3", (req, res) => {
    const formObj = new formidable.IncomingForm(); 
    formObj.encoding = 'UTF-8';
    formObj.uploadDir = "./tempDir";
    formObj.parse(req, (err, body, files) => {
        res.send("post传参的结果是:" + JSON.stringify(body));
    });
})


app.listen(3000);