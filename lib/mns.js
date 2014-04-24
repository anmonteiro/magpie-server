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
      return callback( null, items );
    }
  };

  return function constructor( options ) {
    if ( !options || typeof options !== 'object' ) {
      throw new Error('Options are required!');
    }
    
    var newScraper = Object.create( scraper );

    newScraper.type = options.type;
    newScraper.url = options.url;
    newScraper.groupSelector = options.groupSelector;
    newScraper.articleSelector = options.articleSelector;
    
    //newScraper.parser = type2parser[ newScraper.type ];

    return newScraper;
  }
})();

module.exports = mns;

