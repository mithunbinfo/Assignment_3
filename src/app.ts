import express, { Application } from "express";
import { bookRoutes } from "./app/controllers/book.controllers";
import { borrowRoutes } from "./app/controllers/borrow.controllers";

const app: Application = express();

app.use(express.json());

app.use("/api", bookRoutes, borrowRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Library Management Api!!");
});

export default app;
