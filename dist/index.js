"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./api"));
var config_1 = __importDefault(require("./config"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(api_1.default);
// start express server
try {
    app.listen(config_1.default.port, function () {
        console.log("Connected successfully on port ".concat(config_1.default.port));
    });
}
catch (error) {
    console.error("Error occurred: ".concat(error));
}
