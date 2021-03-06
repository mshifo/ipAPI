"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_1 = require("../middlewares/validate");
var ResizeService_1 = __importDefault(require("../services/ResizeService"));
var config_1 = __importDefault(require("../config"));
var path_1 = __importDefault(require("path"));
var apiRoutes = (0, express_1.Router)();
apiRoutes.get('/', (0, validate_1.fileValidationRules)(), validate_1.validate, function (req, res) {
    var fileName = req.query.fileName;
    var fullFileName = "".concat(fileName).concat(config_1.default.imageType);
    var width = req.query.width;
    var widthInt = parseInt(width); //parse from string to int
    var height = req.query.height;
    var heightInt = parseInt(height); //parse from string to int
    var service = new ResizeService_1.default(fullFileName, widthInt, heightInt);
    service
        .resizeImage()
        .then(function () {
        res.sendFile(path_1.default.resolve("./images/resized/".concat(fullFileName)));
    })
        .catch(function () {
        res.send("<strong>error resizing image</strong>");
    });
});
exports.default = apiRoutes;
