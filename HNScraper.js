var cheerio = require('cheerio'),
  request = require('request');

var HNScraper = function() {
}

HNScraper.prototype.parseArticleElement = function(el, callback){
  var err = null;
  var $ = cheerio.load(el);
  var result = null;
  var $a = $('td.title > a');
  var $span = $('td.title > span');

  if($a.length && $span.length) {
    result = {
      title : $a.text(),
      url : $a.attr('href'),
      src : $span.text(),
    };
  }
  else {
  	err = new Error('Invalid element');
  }
  
  callback(err, result);
}

HNScraper.prototype.scrape = function(callback) {
  request({
    uri : 'http://news.ycombinator.com/news',
    proxy : 'http://extsafira06:extsafira06@10.21.4.37:8080',
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(error, body);
    }
    else {
      error = error || new Error('404');
      callback(error, null);
    }
  });
}

//'td:not([align]).title'
module.exports = new HNScraper();
