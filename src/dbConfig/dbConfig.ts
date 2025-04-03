import mongoose from "mongoose";

export async function connect() {
  try {
    // console.log("Connecting to database...");
    if (!process.env.MONGO_URI) {
      console.log("Mongo URI not found in environment variables");
      return;
    }
    mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;
    // console.log("Mongo URI", process.env.MONGO_URI);
    connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    connection.on("error", (error) => {
      console.log("Error connecting to database" + error);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}
