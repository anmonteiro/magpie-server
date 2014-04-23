/**
  * My News Scraper (mns)
  *
  */

var cheerio = require('cheerio'),
  request = require('request');

var HNScraper = function( options ) {
  if ( this instanceof HNScraper === false ) {
    return new HNScraper( options );
  }
  
  if ( !options ) {
    throw new Error('');
  }
}



module.exports = HNScraper;

