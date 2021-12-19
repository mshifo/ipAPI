"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Start up an instance of app
const app = (0, express_1.default)();
const port = 8000;
// add routing for / path
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World',
    });
});
// start express server
app.listen(port, () => {
    console.log(`Server is starting at prot:${port}`);
});
exports.default = app;
