import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI || "mongodb+srv://codesangamp:codesangamp@cluster1.tidwv.mongodb.net/" );
    console.log("connected to mongodb!")
  }
    catch(error)
    {
      console.log("error:",error);
    }
  };


export default connectDB;
