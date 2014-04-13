var request = require('supertest');
var express = require('express');
var nock = require('nock');
var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect;
var routes = require('../routes');
var app = express();

routes(app);
var api;


describe('GET /', function () {
  
  it('should get the items object', function () {
  	api = nock('http://news.ycombinator.com')
      .get('/news')
      .replyWithFile(200, __dirname + '/hn.html');

    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        console.log(res);
      });
  });

  afterEach(function() {
    nock.cleanAll();
  });

});

describe('GET /random_url_42', function () {
  it('should return an error because we have no routes defined to that url', function () {
  	api = nock('http://news.ycombinator.com')
      .get('/news')
      .replyWithFile(200, __dirname + '/hn.html');
  
    request(app)
      .get('/random_url_42')
      .expect(404);
  });

  afterEach(function() {
    nock.cleanAll();
  });

});