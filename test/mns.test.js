var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  nock = require('nock'),
  cheerio = require('cheerio');

var mns = require('../lib/mns');

describe('the same instance of mns', function () {
  var reddit = [ '{"name" : "Reddit","url" : "http://www.reddit.com",',
    '"type" : "application/json","links" : ["/r/javascript","/r/node"],',
    '"news_selector" : "data.children",',
    '"article_selector":{"url":"data.url","src":"data.title","title":"data.domain"}}'
  ].join(''),
    echojs = [ '{"name" : "EchoJS","url" : "http://www.echojs.com","type" : ',
      '"text/html","links" : [  "/r/javascript",  "/r/node"],"news_selector" : ""}'
      ].join('');

  var scraper;

  reddit = JSON.parse( reddit );

  console.log(reddit);

  it('should be able to receive different configurations', function () {
    scraper = mns(reddit);
    scraper = mns(echojs);

  });
});
