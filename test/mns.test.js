var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  nock = require('nock'),
  cheerio = require('cheerio');

var mns = require('../lib/mns');
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

describe('calling mns without new operator', function() {

  afterEach(function() {
    scraper = null;
  });

  it('should return an instance of mns', function() {
    scraper = mns(echojs);
    expect(scraper).to.be.ok;
    expect(scraper).to.be.instanceOf(mns);
  });

  it('should not pollute the global scope', function() {
    scraper = mns(reddit);
    expect(global).to.exist;
    expect(global).to.not.contain.keys('items','type');
  });
});

describe('the same instance of mns', function() {

  afterEach(function() {
    scraper = null;
  });

  reddit = JSON.parse( reddit );
  echojs = JSON.parse( echojs );
  invalid_echojs = JSON.parse( invalid_echojs );

  console.log( reddit );

  it('should be able to accept new configuration', function() {
    scraper = mns(reddit);
    expect(scraper).to.be.ok;

    scraper = mns(echojs);
    expect(scraper).to.be.ok;

  });

  it('should throw an error when invalid configuration is passed', function() {
    expect(function() {
      scraper = mns( true );
    }).to.throw();

    expect(function() {
      scraper = mns( 'not an object' );
    }).to.throw();

  });
});

describe('an mns instance', function() {
  afterEach(function() {
    scraper = null;
  });

  it('should have mandatory properties', function() {
    scraper = mns( reddit );
    expect( scraper ).to.contain.keys( 'type', 'url' );
  });
});



