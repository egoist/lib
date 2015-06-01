// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var fs = require('fs');
var webshot = require('webshot');

//var argv = require('minimist')(process.argv.slice(2));
// App 全局配置
app.set('views', 'cloud/views'); // 设置模板目录
app.set('view engine', 'ejs'); // 设置 template 引擎
app.use(express.bodyParser()); // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/', function(req, res) {
  res.send('3rd party by INSEKAI');
})
app.get('/hello', function(req, res) {
  res.render('hello', {
    message: 'Congrats, you just set up your app!'
  });
});

app.post('/slug', function(req, res) {
  var string = req.body.string;
  var slug = require(__dirname + '/slug');
  var result = slug(string);
  res.json({
    string: string,
    result: result
  })
})

app.post('/html/to/image', function(req, res) {

  //var html = req.body.html;
  //var data = new Date;
  //var name = req.body.name || (date+'.png');
  webshot('<html><body>Hello World</body></html>', {
    siteType: 'html'
  }, function(err, renderStream) {
    renderStream.pipe(res);
  });
})

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();