var hn = require('../lib/HNScraper.js');

module.exports = (function () {
  return {
    index : function (req, res, next) {
      hn.getItems(function(err, items) {
      	if (err) {
      		return res.send(404);
      	}
        res.json(items);
      });
    }
  };
})();