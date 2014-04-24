var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  nock = require('nock'),
  cheerio = require('cheerio');

var mns = require('../lib/mns');

var reddit = [
  '{"name" : "Reddit","url" : "http://www.reddit.com",',
  '"type" : "application/json","links" : ["/r/javascript/.json","/r/node/.json"],',
  '"groupSelector" : "data.children",',
  '"articleSelector":{"url":"data.url","src":"data.title","title":"data.domain"}}'
].join(''),
  echojs = [
    '{"name" : "EchoJS", "url" : "http://www.echojs.com", "type" : ',
    '"text/html", "links" : [ "/r/javascript", "/r/node" ], "groupSelector" : ""}'
  ].join(''),
  invalid_echojs = [
    '{"name" : "EchoJS","url" : "http://www.echojs.com",',
    '"links" : [ "/r/javascript", "/r/node" ], "groupSelector" : ""}'
  ].join(''),
  hn = [
    '{ "name" : "Hacker News", "url" : "http://news.ycombinator.com",',
    '"type" : "text/html", "links" : [ "/news" ], "news_selector" : "td:not',
    '([align]).title", "article_selector" : { "url" : "a", "src" : "span",',
    '"title" : "a" } }'
  ].join('');

reddit = JSON.parse( reddit );
echojs = JSON.parse( echojs );
invalid_echojs = JSON.parse( invalid_echojs );
hn = JSON.parse( hn );
var scraper;

describe('calling mns without new operator', function() {

  afterEach(function() {
    scraper = null;
  });

  it('should return an object which is a prototype of mns', function() {
    scraper = mns(echojs);
    expect(scraper).to.be.ok;

    /*expect(mnsProto).to.satisfy(function( mns ) {
      return mns.isPrototypeOf(scraper);
    });*/
  });

  it('should not pollute the global scope', function() {
    scraper = mns(reddit);
    expect(global).to.exist;
    expect(global).to.not.contain.keys('items','type');
  });
});

describe('an mns object', function() {

  afterEach(function() {
    scraper = null;
  });

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
      scraper = mns();
    }).to.throw();

    expect(function() {
      scraper = mns( 'not an object' );
    }).to.throw();

  });

  it('should have mandatory properties', function() {
    scraper = mns( reddit );
    expect( scraper ).to.contain.keys( 'type', 'url', 'groupSelector', 'articleSelector' );
    expect( scraper.articleSelector ).to.contain.keys( 'url', 'src', 'title' );
  });

  /*it('should fallback to default properties', function () {
    scraper = mns();
    expect( scraper ).to.contain.keys( 'type', 'url', 'groupSelector', 'articleSelector' );
  });*/

  it('should have json parser when config is json', function() {
    scraper = mns( reddit );
    expect(scraper.parser()).to.equal('json');
    
    scraper = mns( echojs );
    expect(scraper.parser()).to.equal('html');
  });

});

describe('mns function execute', function() {

  describe('with html parser', function() {
    var api;

    afterEach(function() {
      scraper = null;
      nock.cleanAll();
    });

    it('should return a list of 30 items when hn.html is the response', function( done ) {
      api = nock('http://news.ycombinator.com')
      .get('/news')
      .replyWithFile(200, __dirname + '/files/hn.html');

      scraper = mns( hn );
      var items = scraper.execute(function( err, items ) {
        expect(err).to.be.null;
        expect(items).not.to.be.undefined;
        //console.log(JSON.stringify(items, null, 4));
        expect(items).to.have.length(30);
        for (var i = 0; i < 30; i++) {
          (function(idx){
            expect(items[idx]).to.have.keys(['src', 'title', 'url']);
          })(i);
        }

        done();
      });
    });
  });

  describe('with json parser', function() {

  });
});

