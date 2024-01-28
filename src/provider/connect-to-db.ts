import mongoose from "mongoose";

const DB_URL = process.env.DB_URL || "";

if (!DB_URL) {
  throw new Error(
    "Please define the DB_URL environment variable inside .env.local"
  );
}

let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await mongoose.connect(DB_URL, {});

  const db = client.connection.db;
  cachedDb = db;

  return db;
}

export default connectToDatabase;
