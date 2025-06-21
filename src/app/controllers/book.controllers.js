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
    const body = req.body;
    const data = yield book_models_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data,
    });
}));
exports.bookRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterGenre = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const limit = parseInt(req.query.limit) || 10;
        const filter = {};
        if (filterGenre) {
            filter.genre = filterGenre.toUpperCase();
        }
        const sortStr = `-${sortBy}`;
        const books = yield book_models_1.Book.find(filter)
            .sort(sortStr)
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: error.message || "Unknown error",
        });
    }
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
exports.bookRoutes.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
