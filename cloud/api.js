var api = module.exports = {}
var request = require('superagent')

api.getJSON = function (req, res) {
  var url = req.query.url
  if (!url) {
    res.send('no url provided!')
    return
  }
  request
    .get(url)
    .end(function (err, response) {
      res.json(JSON.parse(response.text))
    })
}
