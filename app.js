var express = require('express');
var routes = require('./routes');
var app = express();

routes(app);


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

