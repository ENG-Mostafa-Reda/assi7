import { db } from "../../DB/connection.js";

// 1. Explicit collection "books" with validation (non-empty title)
export const createBooksCollection = async (req, res) => {
  await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "title is required and must be a non-empty string",
          },
        },
      },
    },
  });
  res.status(201).json({ ok: 1 });
};

// 2. Implicit collection "authors" (created by inserting data)
export const createAuthorsCollection = async (req, res) => {
  const result = await db.collection("authors").insertOne(req.body);
  res.status(201).json(result);
};

// 3. Capped collection "logs" with 1MB size
export const createCappedLogs = async (req, res) => {
  await db.createCollection("logs", { capped: true, size: 1024 * 1024 });
  res.status(201).json({ ok: 1 });
};

// 4. Index on books.title
export const createTitleIndex = async (req, res) => {
  const indexName = await db.collection("books").createIndex({ title: 1 });
  res.status(201).json(indexName);
};
