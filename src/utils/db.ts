import mongoose from "mongoose";
import config from "../config/config";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbURI, {});
  } catch (err) {
    process.exit(1);
  }
};
