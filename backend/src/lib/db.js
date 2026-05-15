import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ENV } from "./env.js";

let mongoServer;

export const connectDB = async () => {
  try {
    const { MONGO_URL } = ENV;

    // If no URL or default localhost, try connecting, if it fails, fallback to memory server
    if (!MONGO_URL || MONGO_URL.includes("localhost")) {
      try {
        // Short timeout for local check
        await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 2000 });
        console.log("Connected to local MongoDB");
        return;
      } catch (err) {
        console.log("Local MongoDB not found, starting in-memory database...");
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log("In-memory MongoDB started and connected");
        return;
      }
    }

    const conn = await mongoose.connect(MONGO_URL);
    console.log("Mongodb connected", conn.connection.host);
  } catch (error) {
    console.error("\n==================================================================");
    console.error("DATABASE CONNECTION ERROR!");
    console.error("Please ensure your MONGO_URL in .env is a valid MongoDB URI.");
    console.error("Error details:", error.message);
    console.error("The server will continue to run, but database operations will fail.");
    console.error("==================================================================\n");
  }
};
