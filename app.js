var express = require('express');
var routes = require('./routes');
var app = express();

routes.setup(app);

var port = process.env.PORT || 3000;
var server = app.listen( port, function() {
    console.log('Listening on port %d', server.address().port);
});

