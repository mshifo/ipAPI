"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middlewares"));
const ResizeService_1 = __importDefault(require("../services/ResizeService"));
const config_1 = __importDefault(require("../config"));
const path_1 = __importDefault(require("path"));
const apiRoutes = (0, express_1.Router)();
apiRoutes.get('/', middlewares_1.default.validation, (req, res) => {
    let fileName = req.query.fileName;
    fileName = `${fileName}${config_1.default.imageType}`;
    const width = req.query.width;
    const widthInt = parseInt(width); //parse from string to int
    const height = req.query.height;
    const heightInt = parseInt(height); //parse from string to int
    const service = new ResizeService_1.default(fileName, widthInt, heightInt);
    service
        .resizeImage()
        .then((data) => {
        res.sendFile(path_1.default.resolve(`${__dirname}../../../images/resized/${fileName}`));
        //return res.status(200).json({ data });
    })
        .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: error });
    });
});
exports.default = apiRoutes;
