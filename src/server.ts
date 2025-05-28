import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

// Database connection
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database connected successfully");
    app.listen(config.port, () => {
      console.log(`GYM Management System listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
}

main();
