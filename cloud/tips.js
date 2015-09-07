var cheerio = require('cheerio')
var request = require('superagent')

module.exports = {
  random: function (req, res) {
    var url = 'http://tips.hackplan.com/'
    request.get(url)
      .end(function (error, response) {
        var $ = cheerio.load(response.text)
        var result = {
          category: $('.body').find('.category').html(),
          tip: $('.body').find('.tip').html()
        }
        res.json(result)
      })
  }
}
