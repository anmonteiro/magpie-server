var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  nock = require('nock'),
  cheerio = require('cheerio');

var mns = require('../lib/mns');

describe('mns with json', function () {
  var reddit = [ '{"name" : "Reddit","url" : "http://www.reddit.com",',
    '"type" : "application/json","links" : ["/r/javascript","/r/node"],',
    '"news_selector" : "data.children",',
    '"article_selector":{"url":"data.url","src":"data.title","title":"data.domain"}}'
    ].join('');

  it('should read the content type is JSON and handle it as JSON', function (done) {
    
  });
});
