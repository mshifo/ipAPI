"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validate_1 = require("./validate");
var validation = (0, validate_1.validate)([
    (0, express_validator_1.check)('fileName').exists().custom(validate_1.isFileExist),
    (0, express_validator_1.check)('width').exists().isInt({ min: 10 }),
    (0, express_validator_1.check)('height').exists().isInt({ min: 10 }),
]);
exports.default = {
    validation: validation,
};
