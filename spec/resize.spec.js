/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const request = require('request');

const Message = {
  format: '',
  width: '',
  height: '',
  channels: '',
  premultiplied: '',
  size: '',
};

const base_url =
  'http://localhost:3000/?fileName=sammy.png&width=100&height=50';

describe('API Exists', function () {
  describe('GET /', function () {
    it('returns status code 200', function (done) {
      request.get(base_url, function (error, response) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it('API Response should be valid object', function (done) {
      request.get(base_url, function (error, response, body) {
        let res = JSON.parse(body);
        expect(
          JSON.stringify(Object.keys(Message).sort()) ===
            JSON.stringify(Object.keys(res.message).sort()),
        ).toBeTruthy();

        done();
      });
    });
  });
});
