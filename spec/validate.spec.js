/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const request = require('request');

const ErrorObject = {
  msg: '',
  param: '',
  location: '',
};

const base_url = 'http://localhost:3000/?fileName=samy.png&width=0';

describe('API Validation works', function () {
  describe('GET /', function () {
    it('returns status code 400', function (done) {
      request.get(base_url, function (error, response) {
        expect(response.statusCode).toBe(400);
        done();
      });
    });

    it('API Response should be valid error array of objects', function (done) {
      request.get(base_url, function (error, response, body) {
        let errors = JSON.parse(body).errors;
        errors.map((errorRow) => {
          expect(Object.keys(errorRow)).toContain('msg');
          expect(Object.keys(errorRow)).toContain('param');
          expect(Object.keys(errorRow)).toContain('location');
        });
        done();
      });
    });
  });
});
