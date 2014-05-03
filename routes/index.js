var sites = require( './sites' );

function setup( app ) {

  app.get( '/sites/:id', sites.getSite );
  //app.get( '/sites/*', sites.handle )

};

module.exports.setup = exports.setup = setup;