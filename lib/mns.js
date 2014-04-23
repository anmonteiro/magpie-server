/**
  * My News Scraper (MNS)
  *
  */

var cheerio = require( 'cheerio' ),
  request = require( 'request' ),
  constants = require( './constants' );
  
var type2parser = {};
type2parser[ constants.mime.JSON ] = function() {

}

type2parser[ constants.mime.HTML ] = function() {

}

var items = [];

var MNS = function( options ) {
  if ( this instanceof MNS === false ) {
    return new MNS( options );
  }
  
  if ( options === null || typeof options !== 'object' ) {
    throw new Error('Options are required!');
  }
  
  this.type = options.type;
  this.url = options.url;
  this.selector = options.selector;
  
}



module.exports = MNS;

