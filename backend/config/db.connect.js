import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("DB_KEY");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
