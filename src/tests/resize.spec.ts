import express from 'express';
import request from 'supertest';

const app = express();

const base_url =
    'http://localhost:3000/?fileName=fjord&width=600&height=800';

describe('GET /', function () {
    it('responds with file', function (done) {
        request(app)
            .get(base_url)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(302, done);
    });
});
