import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

export let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("assignment7");
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
};
