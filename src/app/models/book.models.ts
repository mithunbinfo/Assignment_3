import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/book.interfaces";

const bookSchema = new Schema<IBooks>(
  {
    title: {
      type: String,
      required: [true, "Title is a required field"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is a required field"],
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "Isbn is a required field"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Copies is a required field"],
      min: [0, "Copies must be a non-negative number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.methods.updateAvailability = function () {
  if (this.copies <= 0) {
    this.available = false;
  } else {
    this.available = true;
  }
};

bookSchema.post("save", function (doc, next) {
  console.log(`Book saved: ${doc.title}`);
  next();
});

bookSchema.pre("find", function (next) {
  console.log("Inside pre find hook");
  next();
});

export const Book = model("Book", bookSchema);
