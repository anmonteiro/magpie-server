var sites = require( './sites' );

function setup( app ) {
  
  app.all( '*', function(req, res, next) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( 'Access-Control-Allow-Methods', 'GET' );
    res.header( "Access-Control-Allow-Headers", "X-Requested-With" );
    next();
  });

  app.get( '/sites/:id', sites.getSite );
  //app.get( '/sites/*', sites.handle )

};

module.exports.setup = exports.setup = setup;