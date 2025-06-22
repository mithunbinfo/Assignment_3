"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = exports.borrowSchema = void 0;
const mongoose_1 = require("mongoose");
exports.borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.borrowSchema.post("save", function (doc, next) {
    console.log("%s has been saved", doc._id);
    next();
});
exports.borrowSchema.pre("find", function (next) {
    console.log("Inside pre find hook");
    next();
});
exports.Borrow = (0, mongoose_1.model)("Borrow", exports.borrowSchema);
