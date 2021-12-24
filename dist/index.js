"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(api_1.default);
// start express server
try {
    app.listen(config_1.default.port, () => {
        console.log(`Connected successfully on port ${config_1.default.port}`);
    });
}
catch (error) {
    console.error(`Error occurred: ${error}`);
}
