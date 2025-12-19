// tests/setup.js
import mongoose from "mongoose";

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/blog_api_test";
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
