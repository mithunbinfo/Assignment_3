import express, { Request, Response } from "express";
import { Book } from "../models/book.models";

export const bookRoutes = express.Router();

bookRoutes.post("/books", async (req: Request, res: Response) => {
  const body = req.body;
  const data = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data,
  });
});

bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const filterGenre = req.query.filter as string | undefined;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const limit = parseInt(req.query.limit as string) || 10;

    const filter: { genre?: string } = {};
    if (filterGenre) {
      filter.genre = filterGenre.toUpperCase();
    }

    const sortStr = `-${sortBy}`;

    const books = await Book.find(filter)
      .sort(sortStr)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error.message || "Unknown error",
    });
  }
});

bookRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const data = await Book.findById(bookId);

  res.status(201).json({
    success: true,
    message: "Book retrieved successfully",
    data,
  });
});

bookRoutes.patch("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBody = req.body;
  const data = await Book.findOneAndUpdate({ _id: bookId }, updatedBody, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: "Book updated successfully",
    data,
  });
});

bookRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const data = await Book.findByIdAndDelete(bookId);

  res.status(201).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});
