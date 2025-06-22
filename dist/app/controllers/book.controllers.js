"use strict";
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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_models_1 = require("../models/book.models");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const data = yield book_models_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        let formattedError = error;
        if (error.name === "ValidationError") {
            formattedError = {
                name: error.name,
                errors: {},
            };
            for (const key in error.errors) {
                const err = error.errors[key];
                formattedError.errors[key] = {
                    message: err.message,
                    name: err.name,
                    properties: {
                        message: (_a = err.properties) === null || _a === void 0 ? void 0 : _a.message,
                        type: (_b = err.properties) === null || _b === void 0 ? void 0 : _b.type,
                        min: (_c = err.properties) === null || _c === void 0 ? void 0 : _c.min,
                    },
                    kind: err.kind,
                    path: err.path,
                    value: err.value,
                };
            }
        }
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: formattedError,
        });
    }
}));
exports.bookRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterGenre = req.query.filter;
    const sortBy = req.query.sortBy || "createdAt";
    const limit = parseInt(req.query.limit) || 10;
    const filter = {};
    if (filterGenre) {
        filter.genre = filterGenre.toUpperCase();
    }
    const sortStr = `-${sortBy}`;
    const books = yield book_models_1.Book.find(filter).sort(sortStr).limit(limit);
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
}));
exports.bookRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield book_models_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data,
    });
}));
exports.bookRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const data = yield book_models_1.Book.findOneAndUpdate({ _id: bookId }, updatedBody, {
        new: true,
    });
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data,
    });
}));
exports.bookRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const data = yield book_models_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
}));
