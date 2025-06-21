import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.models";

export const borrowRoutes = express.Router();

borrowRoutes.post("/borrow", async (req: Request, res: Response) => {
  const body = req.body;
  const data = await Borrow.create(body);

  res.status(201).json({
    success: true,
    message: "Borrow created successfully",
    data,
  });
});

borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const data = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          title: "$bookInfo.title",
          isbn: "$bookInfo.isbn",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

