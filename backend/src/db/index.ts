import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED", error);
    console.log("MONGODB URL: ", `${process.env.MONGODB_URI}`);
    process.exit(1);
  }
};

export default connectDB;
