var chai = require( 'chai' ),
  should = chai.should(),
  expect = chai.expect,
  nock = require( 'nock' ),
  cheerio = require( 'cheerio' ),
  fs = require( 'fs' );

var mns = require( '../lib/mns' );
var sites = fs.readFileSync( __dirname + '/files/sitesToScrape.json' );

sites = JSON.parse( sites );

var reddit = sites[ 'reddit-js' ],
  echojs = sites.echojs,
  invalid_echojs = [
    '{"name" : "EchoJS","url" : "http://www.echojs.com",',
    '"links" : [ "/r/javascript", "/r/node" ], "listSelector" : ""}'
  ].join(''),
  hn = sites.hn;

invalid_echojs = JSON.parse( invalid_echojs );
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
    expect( scraper ).to.contain.keys( 'type', 'url', 'listSelector', 'articleSelector' );
    expect( scraper.articleSelector ).to.contain.keys( 'url', 'src', 'title' );
  });

  /*it('should fallback to default properties', function () {
    scraper = mns();
    expect( scraper ).to.contain.keys( 'type', 'url', 'groupSelector', 'articleSelector' );
  });*/

  it('should match passed options', function() {
    scraper = mns( hn );
    expect( scraper ).to.contain.keys( 'url', 'type', 'listSelector', 'articleSelector' );
    expect( scraper.url ).to.equal( hn.url );
    expect( scraper.type ).to.equal( hn.type );
    expect( scraper.listSelector ).to.eql( hn.listSelector );
    expect( scraper.articleSelector ).to.eql( hn.articleSelector );

    scraper = mns( echojs );
    expect( scraper ).to.contain.keys( 'url', 'type', 'listSelector', 'articleSelector' );
    expect( scraper.url ).to.equal( echojs.url );
    expect( scraper.type ).to.equal( echojs.type );
    expect( scraper.listSelector ).to.eql( echojs.listSelector );
    expect( scraper.articleSelector ).to.eql( echojs.articleSelector );

  });

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

    describe('should return a list of 30 items', function() {
      it('when hn.html is the response', function( done ) {
	    api = nock( 'http://news.ycombinator.com' )
	      .get( '/news' )
	      .replyWithFile( 200, __dirname + '/files/hn.html' );

	    scraper = mns( hn );

	    var items = scraper.execute(function( err, items ) {
	      expect( err ).to.be.null;
	      expect( items ).not.to.be.undefined;

	      expect( items ).to.have.length( 30 );

	      for (var i = 0; i < 30; i++) {
	        (function( idx ) {
	          expect( items[ idx ] ).to.have.keys( Object.keys( hn.articleSelector ) );
	        })( i );
	      }

	      done();
	    });
	  });

	  it('when echojs.html is the response', function( done ) {
	    api = nock( 'http://www.echojs.com' )
	      .get( '/' )
	      .replyWithFile( 200, __dirname + '/files/echojs.html' );

	    scraper = mns( echojs );

	    var items = scraper.execute(function( err, items ) {
	      expect( err ).to.be.null;
	      expect( items ).not.to.be.undefined;

	      expect( items ).to.have.length( 30 );

	      for (var i = 0; i < 30; i++) {
	        (function( idx ) {
	          expect( items[ idx ] ).to.have.keys( Object.keys( echojs.articleSelector ) );
	        })( i );
	      }

	      done();
	    });
      });
    });
  });

  describe('with json parser', function() {

  });
});

