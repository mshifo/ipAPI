"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var supertest_1 = __importDefault(require("supertest"));
var app = (0, express_1.default)();
var base_url = 'http://localhost:3000/?fileName=fjord&width=600&height=800';
describe('GET /', function () {
    it('responds with file', function (done) {
        (0, supertest_1.default)(app)
            .get(base_url)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(302, done);
    });
});
