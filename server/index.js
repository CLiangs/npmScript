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

sass.render({
    file: 'src/css/style.scss',
    outFile: 'dist/css/style.css'
}, function(err, result) { // node-style callback from v3.0.0 onwards
    if(err) {
        throw err;
    }
    fs.writeFile('dist/css/style.css', result.css, err => {
        if (err) {
            throw err;
        }
    })
});