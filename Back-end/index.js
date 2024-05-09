
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;

const userSchema = new mongoose.Schema({
    // nom: String,
    // age: Number
    state : String
  });
  
  const UserModel = mongoose.model("collection1", userSchema);
  
  app.get("/getUsers", async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "An error occurred while fetching users" });
    }
  });
  
const MONGOURL = process.env.MONGO_URL;


mongoose.connect(MONGOURL).then(() => {
  console.log("Database connected successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
