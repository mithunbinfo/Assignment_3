import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interfaces";

export const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Borrow = model("Borrow", borrowSchema);
