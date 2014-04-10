var request = require('supertest');
var express = require('express');
var chai = require('chai'),
  should = chai.should(),
  expect = chai.expect;
var app = express();

describe('GET /', function (argument) {
  it('should get the items object', function () {
    request(app)
      .get('/')
      .expect(200)
      .expect(/json/);
  });
});

