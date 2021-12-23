/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const request = require('request');

const base_url =
  'http://localhost:3000/?fileName=sammy.png&width=100&height=50';

describe('API Works', function () {
  describe('GET /', function () {
    it('returns status code 200', function (done) {
      request.get(base_url, function (error, response) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('API Response should be valid message object', function (done) {
      request.get(base_url, function (error, response, body) {
        let dataRow = JSON.parse(body);
        expect(Object.keys(dataRow.data)).toContain('format');
        expect(Object.keys(dataRow.data)).toContain('width');
        expect(Object.keys(dataRow.data)).toContain('height');
        done();
      });
    });
  });
});
