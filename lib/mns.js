/**
  * My News Scraper (MNS)
  *
  */

var cheerio = require('cheerio'),
  request = require('request');

var items = [];

var MNS = function( options ) {
  if ( this instanceof MNS === false ) {
    return new MNS( options );
  }
  
  if ( options === null || typeof options !== 'object' ) {
    throw new Error('Invalid object');
  }
  
  this.type = options.type;
}



module.exports = MNS;

