var mns = require( 'mns' );
var sites = require( '../sitesToScrape.json' );

var sitesController = (function() {


  function getSite( req, res, next ) {
    var id = req.params.id,
      options = sites[ id ],
      scraper;

    if ( !options ) {
      return next();
    }

    scraper = mns( options );

    scraper.execute(function( err, items ) {
      if ( err ) {
        return next();
      }
      return res.json(items);
    });
  }

  return {
    getSite : getSite
  };
})();


module.exports = exports = sitesController;
