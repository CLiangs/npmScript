//引入http模块
var http = require("http");
var sass = require('node-sass');
var fs = require('fs');
//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 3000;
//创建服务
// var server = http.createServer(function(req,res){
//     res.setHeader('Content-Type','text/plain');
//     res.end("hello nodejs");

// });
// server.listen(port,hostName,function(){
//     console.log(`服务器运行在http://localhost:${port}`);
// });
// node-sass
sass.render({
    file: 'wwwroot/css/style.scss',
    outFile: 'dist/css/style.css'
}, function(err, result) { 
    if(err) {
        throw err;
    }
    // 读取目录内容
    fs.readdir('wwwroot', {withFileTypes :true},function(err, result){
        console.log(result)
    }),
    // 创建 dist/css 目录
    fs.mkdir('dist/css', { recursive: true }, (err) => {
        if (err) throw err;
        fs.writeFile('dist/css/style.css', result.css, err => {
            if (err) {
                throw err;
            }
        })
    });
});