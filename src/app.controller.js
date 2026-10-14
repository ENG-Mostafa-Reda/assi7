import express from "express";
import { connectDB } from "./DB/connection.js";
import collectionRouter from "./modules/collection/collection.routes.js";
import booksRouter from "./modules/books/books.routes.js";
import logsRouter from "./modules/logs/logs.routes.js";

const bootstrap = async () => {
  const app = express();
  const port = 3000;

  app.use(express.json());
  await connectDB();

  app.use("/collection", collectionRouter);
  app.use("/books", booksRouter);
  app.use("/logs", logsRouter);

  app.use("*", (req, res) => res.status(404).json({ message: "Route not found" }));

  // global error handler
  app.use((err, req, res, next) => {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  });

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

export default bootstrap;
