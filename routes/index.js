var mna = require('./mna');

module.exports = function (app) {

  app.get('/', mna.index);


};