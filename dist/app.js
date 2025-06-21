"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./app/controllers/book.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", book_controllers_1.bookRoutes, borrow_controllers_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management Api!!");
});
exports.default = app;
