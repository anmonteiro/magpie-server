//var request = require('supertest');
var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect;
var hn = require('../HNScraper');

describe('HNScraper parse article element function', function(){
  var el,
    obj;
  beforeEach(function(){
    el = '<td class=​"title">​<a href=​"http:​/​/​www.buildyourownlisp.com/​">​'
      + 'Learn C and build your own programming language​</a>'
      + '​<span class=​"comhead">​ (buildyourownlisp.com) ​</span>​</td>​';
    obj = {
      title : 'Learn C and build your own programming language​',
      url: 'http:​/​/​www.buildyourownlisp.com/​',
      src: ' (buildyourownlisp.com) ​',
    };
  });

  it('should parse one DOM element with the article link into an object', function(){
    hn.parseArticleElement(el, function(err, art){
    	expect(err).to.be.null;
    	expect(err).not.to.be.undefined;
    	art.should.be.ok;
    	art.should.be.an('object');
      art.should.not.be.empty;
      art.should.eql(obj);
    });
  });
});
