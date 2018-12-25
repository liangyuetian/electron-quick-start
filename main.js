const express = require("express");
const path = require("path");
// const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const app = express();
const Win = require('./win');

app.use(express.static(path.join(__dirname, 'ng-docs.github.io-master')));

// 超时时间
const TIME_OUT = 30 * 1e3;

// 设置端口
app.set('port', '7001');

// 设置超时 返回超时响应
// app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
    if (!req.timedout) next();
});

proxyOption = {
    target: 'http://localhost:8080',
    pathRewrite: {
        '^/api/': '/' // 重写请求，api/解析为/
    },
    changeOrigoin: true
};

// 静态资源路径
app.use(express.static(path.join(__dirname, 'ng-docs.github.io-master')));

// 反向代理
app.use('/api/*', proxy(proxyOption));

// 监听端口
app.listen(app.get('port'), () => {
    console.log(`server running @${app.get('port')}`);
    Win.ready();
});
// var server = appExpress.listen(7001, '127.0.0.1', function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log(host, port);
//     console.log(__dirname);
//     Win.ready();
// });