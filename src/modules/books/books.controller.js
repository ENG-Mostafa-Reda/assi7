import { db } from "../../DB/connection.js";

const books = () => db.collection("books");

// 5. Insert one book
export const addBook = async (req, res) => {
  const result = await books().insertOne(req.body);
  res.status(201).json(result);
};

// 6. Insert many books
export const addBooksBatch = async (req, res) => {
  const result = await books().insertMany(req.body);
  res.status(201).json(result);
};

// 8. Update book year by title -> 2022
export const updateBookYear = async (req, res) => {
  const result = await books().updateOne(
    { title: req.params.title },
    { $set: { year: 2022 } }
  );
  res.status(200).json(result);
};

// 9. Find book by title
export const getBookByTitle = async (req, res) => {
  const book = await books().findOne({ title: req.query.title });
  res.status(200).json(book);
};

// 10. Books between two years
export const getBooksByYearRange = async (req, res) => {
  const from = Number(req.query.from);
  const to = Number(req.query.to);
  const result = await books().find({ year: { $gte: from, $lte: to } }).toArray();
  res.status(200).json(result);
};

// 11. Books where genres include a genre
export const getBooksByGenre = async (req, res) => {
  const result = await books().find({ genres: req.query.genre }).toArray();
  res.status(200).json(result);
};

// 12. Skip 2, limit 3, sort by year desc
export const skipLimitBooks = async (req, res) => {
  const result = await books().find().sort({ year: -1 }).skip(2).limit(3).toArray();
  res.status(200).json(result);
};

// 13. year stored as integer
export const getBooksYearInteger = async (req, res) => {
  const result = await books().find({ year: { $type: "int" } }).toArray();
  res.status(200).json(result);
};

// 14. genres don't include Horror or Science Fiction
export const excludeGenres = async (req, res) => {
  const result = await books()
    .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
    .toArray();
  res.status(200).json(result);
};

// 15. Delete books before a year
export const deleteBooksBeforeYear = async (req, res) => {
  const result = await books().deleteMany({ year: { $lt: Number(req.query.year) } });
  res.status(200).json(result);
};

// 16. Aggregation: year > 2000 sorted by year desc
export const aggregate1 = async (req, res) => {
  const result = await books()
    .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
    .toArray();
  res.status(200).json(result);
};

// 17. Aggregation: year > 2000, project title, author, year
export const aggregate2 = async (req, res) => {
  const result = await books()
    .aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } },
    ])
    .toArray();
  res.status(200).json(result);
};

// 18. Aggregation: unwind genres
export const aggregate3 = async (req, res) => {
  const result = await books()
    .aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, genres: 1 } },
    ])
    .toArray();
  res.status(200).json(result);
};

// 19. Aggregation: join logs with books
export const aggregate4 = async (req, res) => {
  const result = await db
    .collection("logs")
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      {
        $project: {
          _id: 0,
          action: 1,
          "book_details.title": 1,
          "book_details.author": 1,
          "book_details.year": 1,
        },
      },
    ])
    .toArray();
  res.status(200).json(result);
};
