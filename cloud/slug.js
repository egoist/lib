var unidecode = require('unidecode');
var slug = function(string) {
  var seperator = '-';
  string = unidecode(string);
  string = string.replace(/[:\/\?#\[\]@!$&'()*+,;=\\%<>\|\^~£"]/g, '')
    // Replace dots and spaces with a sepeator
    .replace(/(\s|\.)/g, seperator)
    // Convert 2 or more sepeators into just one sepeator
    .replace(/-+/g, seperator)
    // Make the whole thing lowercase
    .toLowerCase()
  if (string.substring(string.length - 1) == '-') {
    string = string.substring(0, string.length - 1)
  }
  return string;
}

module.exports = slug;