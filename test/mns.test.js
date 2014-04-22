var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  nock = require('nock'),
  cheerio = require('cheerio');

var mns = require('../lib/mns');

describe('the same instance of mns', function () {
  var reddit = [
    '{"name" : "Reddit","url" : "http://www.reddit.com",',
    '"type" : "application/json","links" : ["/r/javascript/.json","/r/node/.json"],',
    '"news_selector" : "data.children",',
    '"article_selector":{"url":"data.url","src":"data.title","title":"data.domain"}}'
  ].join(''),
    echojs = [
      '{"name" : "EchoJS", "url" : "http://www.echojs.com", "type" : ',
      '"text/html", "links" : [ "/r/javascript", "/r/node" ], "news_selector" : ""}'
    ].join(''),
    invalid_echojs = [
      '{"name" : "EchoJS","url" : "http://www.echojs.com",',
      '"links" : [ "/r/javascript", "/r/node" ], "news_selector" : ""}'
    ].join('');

  var scraper;

  afterEach(function () {
    scraper = null;
  });



  reddit = JSON.parse( reddit );
  echojs = JSON.parse( echojs );
  invalid_echojs = JSON.parse( invalid_echojs );

  console.log( reddit );

  it('should be able to accept new configuration', function () {
    scraper = mns(reddit);
    expect(scraper).to.be.ok;

    scraper = mns(echojs);
    expect(scraper).to.be.ok;

  });

  it('should throw an error when invalid configuration is passed', function () {
    expect(function () {
      scraper = mns(invalid_echojs);
    }).to.throw();
  });
});



