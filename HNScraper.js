var HNScraper = function() {
  return {
    parseArticleElement : function(el, callback){
      
      callback(null, {
        title : 'Learn C and build your own programming language​',
        url: 'http:​/​/​www.buildyourownlisp.com/​',
        src: ' (buildyourownlisp.com) ​',
      });
    }
  };
}


module.exports = new HNScraper();