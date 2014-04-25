/**
  * My News Scraper (MNS)
  *
  */

var cheerio = require( 'cheerio' ),
  request = require( 'request' ),
  constants = require( './constants' );


var mns = (function() {

  var type2parser = {};
  type2parser[ constants.mime.JSON ] = function( data ) {
    return 'json';
  }

  type2parser[ constants.mime.HTML ] = function( data ) {
    return 'html';
  }
  var items = [];

  var scraper = {
    parser : function() {
      return type2parser[ this.type ].call( null );
    },
    execute : function( callback ) {
      var self = this;
      items = [];

      self.scrape(function(err, body) {
        if (err) {
          return callback(err);
        }
        var $ = cheerio.load(body);

        $( self.listSelector ).each(function( index, element ) {
          self.parseArticleElement( $( element ), function( err, res ) {
            if( err ) {
              return console.log( err );
            }
            return items.push( res );
          });
        });

        return callback(null, items);
      });
    },
    scrape : function( callback ) {
      request( this.url, function( error, res, body ) {
        if ( !error && res.statusCode == 200 ) {
          return callback(error, body);
        }

        error = error || new Error( '404' );
        return callback(error, body);
      });
    },
    parseArticleElement : function( $el, callback ) {
      var err = null;
      var result = null;
      var $a = $el.find( this.articleSelector.url );
      var $span = $el.find( this.articleSelector.src );

      if( $a.length && $span.length ) {
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

  };

  return function constructor( options ) {
    if ( !options || typeof options !== 'object' ) {
      throw new Error('Options are required!');
    }
    
    var newScraper = Object.create( scraper );

    newScraper.type = options.type;
    newScraper.url = options.url;
    newScraper.listSelector = options.listSelector;
    newScraper.articleSelector = options.articleSelector;
    
    //newScraper.parser = type2parser[ newScraper.type ];

    return newScraper;
  }
})();

module.exports = mns;

