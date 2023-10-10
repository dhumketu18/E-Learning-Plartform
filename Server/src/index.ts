import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import adminRouter from "./router/adminRouter";
import userRouter from "./router/userRouter";
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://mayank:123@cluster0.cunevg1.mongodb.net/courses",
  {
    dbName: "courses",
  }
);

app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
