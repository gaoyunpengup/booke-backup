const express = require("express");
const app = express();
const formidable = require("formidable");
const fs = require("fs");
const uuid = require("uuid").v1;
app.use(express.static("./public"));
app.use(express.urlencoded({
    extended: true
}));
// 单文件上传(表单接收)
app.post("/uploadOneFile", (req, res) => {
    const formObj = new formidable.IncomingForm();
    formObj.encoding = "UTF-8";
    formObj.uploadDir = "./tempDir";
    formObj.parse(req, (err, body, files) => {
        let {
            image: fileObj
        } = files;
        let oldPath = "./" + fileObj['path'];
        let newPath = `./uploadFile/${fileObj['name']}`;
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                res.send(err.toString());
            } else {
                res.send("上传文件成功");
            }
        })
    })
})
// 单文件上传(base64字符串)
app.post("/uploadOneFile_base64", (req, res) => {
    let {
        imgStr
    } = req.body;
    var base64Str = imgStr.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64 (png也可以是jpg等)
    var dataBuffer = new Buffer(base64Str, 'base64'); //把base64码转成buffer对象，
    fs.writeFile(`./uploadFile/${uuid()}.png`, dataBuffer, function (err) { //用fs写入文件
        if (err) {
            res.send(err.toString());
        } else {
            res.send("文件写入成功");
        }
    })
})
// 多文件上传(formidable接收)
app.post("/uploadManyFile", (req, res) => {
    const formObj = new formidable.IncomingForm();
    formObj.encoding = "UTF-8";
    formObj.uploadDir = "./tempDir";
    var fileArr=[]; // 装文件对象
    formObj.on('file', function (filed, file) { // 监听文件事件, 把文件对象保存起来
        fileArr.push(file);
    })
    formObj.parse(req, (err, body, files) => {
        try {
            fileArr.map(fileObj => { // 取出文件对象
                let oldPath = "./" + fileObj['path'];
                let newPath = `./uploadFile/${fileObj['name']}`;
                fs.renameSync(oldPath, newPath);
            })
        } catch (err) {
            res.send(err.toString());
            return;
        }
        res.send("上传成功");
    })
})

app.listen(3000);