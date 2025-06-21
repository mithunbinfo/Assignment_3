import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = 5000;

async function main() {
  try {
     mongoose.connect('mongodb+srv://mongodb:M3pU9K4WXEE0dJGP@cluster0.4oskfev.mongodb.net/layout-management-api?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Connected to Mongodb is Mongoose");

    server = app.listen(PORT, () => {
      console.log(`Library Management App is port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
