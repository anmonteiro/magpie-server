var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect,
  nock = require('nock');

var hn = require('../HNScraper');

describe('HNScraper parse article element function', function() {
  var el,
    invalidEl,
    obj;
  beforeEach(function() {
    el = '<td class="title"><a href="http://www.buildyourownlisp.com/">' +
      'Learn C and build your own programming language</a>' +
      '<span class="comhead"> (buildyourownlisp.com) </span></td>';
    obj = {
      title : 'Learn C and build your own programming language',
      url: 'http://www.buildyourownlisp.com/',
      src: ' (buildyourownlisp.com) ',
    };
  });

  afterEach(function() {
    el = null;
    invalidEl = null;
    obj = null;
  });

  it('should parse one DOM element with the article link into an object', function() {
    hn.parseArticleElement(el, function(err, art) {
    	expect(err).to.be.null;
    	expect(err).not.to.be.undefined;
    	art.should.be.ok;
    	art.should.be.an('object');
      art.should.not.be.empty;
      art.should.eql(obj);
    });
  });

  it('should return an error when an empty DOM element is passed to the function', function() {
    hn.parseArticleElement('', function(err, art) {
      expect(err).not.to.be.null;
      expect(err).not.to.be.undefined;
      expect(art).not.to.be.ok;
    });
  });
  
  it('should also return an error if an invalid element is passed', function() {
    invalidEl = '<div class="titl"><a href="http://www.buildyourownlisp.com/">' +
      'Learn C and build your own programming language</a>' +
      '<span class="comhead"> (buildyourownlisp.com) </span></div>';

      hn.parseArticleElement(invalidEl, function(err, art) {
        expect(err).not.to.be.null;
        expect(err).not.to.be.undefined;
        expect(art).not.to.be.ok;
      });
  });
});

describe('HNScraper.scrape', function() {
  var api;
  beforeEach(function() {
    
  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('should get content when passed the correct url', function(done) {
    api = nock('http://10.21.4.37:8080')
      .get('http://news.ycombinator.com/news')
      .reply(200, 'hi');
    hn.scrape(function(err, content) {
      expect(err).to.be.null;
      expect(content).to.eql('hi');
      done();
    });
  });

  it('should return an error when the server replies 404', function(done) {
    api = nock('http://10.21.4.37:8080')
      .get('http://news.ycombinator.com/news')
      .reply(404);

    hn.scrape(function(err, content) {
      expect(err).to.be.ok;

      done();
    });
  });

});