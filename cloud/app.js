// 在 Cloud code 里初始化 Express 框架
var express = require('express')
var app = express()
var fs = require('fs')
var cheerio = require('cheerio')
var request = require('superagent')
var bodyParser = require('body-parser')
var async = require('async')

//var argv = require('minimist')(process.argv.slice(2));
// App 全局配置
app.set('views', 'cloud/views'); // 设置模板目录
app.set('view engine', 'ejs'); // 设置 template 引擎

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/', function(req, res) {
  res.send('3rd party by INSEKAI <a href="https://github.com/aprilorange/lib">https://github.com/aprilorange/lib</a>');
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



app.get('/jianshu/:userhash/posts', function(req, res) {
  var userhash = req.params.userhash;
  var url = 'http://www.jianshu.com/users/' + userhash + '/latest_articles';
  request
    .get(url)
    .end(function(error, response) {
      var $ = cheerio.load(response.text);
      var list = $('.tab-content').find('.latest-notes');
      list = parseList($, list);
      var result = {
        page: page,
        posts: list
      }
      res.json(result);
    })

  function parseList($, list) {
    var posts = [];
    list.find('li').each(function() {
      var post = {
        title: $(this).find('.title').text(),
        link: 'http://jianshu.com' + $(this).find('.title').find('a').attr('href')
      }
      posts.push(post)
    })
    return posts;
  }

})

app.get('/anime/daily', function(req, res) {
  var days = []
  for(var i = 1; i <= 7; i++) {
    days.push('#weekdiv' + i)
  }
  var animes = {}
  var url = 'http://www.dilidili.com/'
  
  request
    .get(url)
    .end(function(error, response) {
      var $ = cheerio.load(response.text)
      days.forEach(function(day, index) {
        var today = []
        $('.week_mend').find(day).find('.week_item').each(function() {
          var name = $(this).find('.week_item_left').text()
          var comingEpisode = $(this).find('.week_item_right').text() || null
          var a = {
            name: name,
            comingEpisode: comingEpisode
          }
          today.push(a)
        })
        animes['weekday' + index] = today
      })
      res.json(animes)
      
    })
})

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen(3000);