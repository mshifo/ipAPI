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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const sharp_1 = __importDefault(require("sharp"));
const validate_1 = require("./validate");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Start up an instance of app
const app = (0, express_1.default)();
// application port to be run on
const port = process.env.PORT;
// folder contains images to be resized
const imagesFolder = process.env.IMAGES_FOLDER;
// folder contains resized images
const resizedImagesFolder = process.env.RESIZED_IMAGES_FOLDER;
// add routing for / path
app.get('/', (0, validate_1.validate)([
    (0, express_validator_1.check)('fileName').exists().custom(validate_1.isFileExist),
    (0, express_validator_1.check)('width').exists().isInt({ min: 10 }),
    (0, express_validator_1.check)('height').exists().isInt({ min: 10 }),
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.fileName;
    const width = req.query.width;
    const widthInt = parseInt(width); //parse from string to int
    const height = req.query.height;
    const heightInt = parseInt(height); //parse from string to int
    //check if file already resized before then don't resize again
    checkIfResizedBefore(fileName, widthInt, heightInt)
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data) {
            return res.json({
                data,
            });
        }
        else {
            // resize if not resized before
            yield resizeImage(fileName, widthInt, heightInt)
                .then((data) => {
                return res.json({
                    data,
                });
            })
                .catch((error) => {
                return res.status(500).json({
                    message: error,
                });
            });
        }
    }))
        .catch((error) => {
        return res.status(500).json({
            message: error,
        });
    });
}));
const checkIfResizedBefore = function (fileName, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, sharp_1.default)(resizedImagesFolder + fileName)
            .metadata() //get file metadata
            .then((data) => {
            if (data.width === width && data.height === height) {
                //if width and height the same as the file's
                return data;
            }
            else {
                return false;
            }
        })
            .catch(() => {
            return false;
        });
    });
};
const resizeImage = function (fileName, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield (0, sharp_1.default)(imagesFolder + fileName)
                .resize({
                width,
                height,
            })
                .toFile(resizedImagesFolder + fileName);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
};
// start express server
try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    console.error(`Error occurred: ${error}`);
}
exports.default = app;
