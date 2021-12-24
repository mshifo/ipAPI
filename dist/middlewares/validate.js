"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.fileValidationRules = void 0;
var express_validator_1 = require("express-validator");
var fs = __importStar(require("fs"));
var config_1 = __importDefault(require("../config"));
var fileValidationRules = function () {
    return [
        (0, express_validator_1.query)('fileName').exists().custom(isFileExist),
        (0, express_validator_1.query)('width').exists().isInt({ min: 10 }),
        (0, express_validator_1.query)('height').exists().isInt({ min: 10 }),
    ];
};
exports.fileValidationRules = fileValidationRules;
var validate = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    res.send("<strong>".concat(errors.array()[0].param, ": ").concat(errors.array()[0].msg, "</strong>"));
};
exports.validate = validate;
var isFileExist = function (value) {
    var filePath = "".concat(config_1.default.imagesFolder).concat(value).concat(config_1.default.imageType);
    return fs.promises.access(filePath, fs.constants.F_OK);
};
