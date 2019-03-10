//引入http模块
var http = require("http");
var sass = require('node-sass');
var fs = require('fs');
var program = require('commander'),
    shtml2html = require('./shtml2html');

program
    .version('1.0.5')
    .usage('shtml2html [options]')
    .option('-s, --source [value]', 'optional, default is current folder')
    .option('-d, --destination [value]', 'optional, default is a temp folder in the source folder')
    .option('-w, --wwwroot [value]', 'optional, only required when include files are quoted with absolute path')
    .parse(process.argv);

var source = program.source,
    destination = program.destination,
    wwwroot = program.wwwroot;

var info = [':D', ':(', ':|'];
var log = function(msg, type) {
    if (!type) type = 'success';
    switch (type) {
        case 'success':
            msg = '\x1B[32m' + '[' + info[0] + '] ' + msg + '\x1B[39m';
            break;
        case 'fail':
            msg = '\x1B[31m' + '[' + info[1] + '] ' + msg + '\x1B[39m';
            break;
        case 'warn':
            msg = '\x1B[33m' + '[' + info[2] + '] ' + msg + '\x1B[39m';
            break;
    }
    console.log(msg.replace(/\\/g, '/'));
};
var callback = function(msgs) {
    if (msgs.length > 0) {
        msgs.forEach(function(o) {
            log(o.msg, o.type)
        });
    }
    else {
        log('Done! No new file created.')
    }
};

shtml2html(source, destination, wwwroot, callback);

//设置主机名
var hostName = '127.0.0.1';
//设置端口
var port = 3000;
//创建服务
var server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/plain');
    res.end("hello nodejs");

});
server.listen(port,hostName,function(){
    console.log(`服务器运行在http://localhost:${port}`);
});
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