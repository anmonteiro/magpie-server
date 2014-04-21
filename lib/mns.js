/**
  * My News Scraper (mns)
  *
  */

var cheerio = require('cheerio'),
  request = require('request');

var HNScraper = function() {
  if ( this instanceof HNScraper === false ) {
    return new HNScraper();
  }
}

HNScraper.prototype.parseArticleElement = function($el, callback){
  var err = null;
  var result = null;
  var $a = $el.find('td.title > a');
  var $span = $el.find('td.title > span');

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
    uri : 'http://news.ycombinator.com/news'
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return callback(error, body);
    }

    error = error || new Error('404');
    return callback(error, body);
  });
}

HNScraper.prototype.getItems = function(callback) {
  var result = [],
    that = this;

  this.scrape(function(err, body) {
    if (err) {
      return callback(err);
    }
    var $ = cheerio.load(body);

    $('td:not([align]).title').each(function (index, element) {
      that.parseArticleElement($(element), function (err, res) {
        if(err) {
          console.log(err);
        } else {
          result.push(res);
        }
      });
    });

    return callback(null, result);
  });
}

module.exports = HNScraper;

