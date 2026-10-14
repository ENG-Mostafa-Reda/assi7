import { ObjectId } from "mongodb";
import { db } from "../../DB/connection.js";

// 7. Insert a log (book_id is stored as ObjectId so $lookup works)
export const addLog = async (req, res) => {
  const log = { ...req.body };
  if (log.book_id && ObjectId.isValid(log.book_id)) {
    log.book_id = new ObjectId(log.book_id);
  }
  const result = await db.collection("logs").insertOne(log);
  res.status(201).json(result);
};
