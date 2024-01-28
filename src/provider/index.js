import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user/route";
import postRouter from "./routes/post/route";
import "dotenv/config";

// definations
const app = express();
const port = process.env.PORT || 9000;
const DB_URL = process.env.DB_URL || "";

// app json
app.use(express.json());

// app routes
app.use("/api/users", userRouter);
app.use("/api/auth", userRouter);
app.use("/api", postRouter);

// extablishing connection
mongoose
  .connect(DB_URL)
  .then((res) => {
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  })
  .then(() => console.log("CONNECTION ESTABLISHED WITH DATABASE"))
  .catch((err) => {
    console.log("FAILED TO CONNECT", err.message);
  });

// listening to api '/'
app.use("/", (req, res, next) => {
  console.log(req.body);
  next();
  res.send({ message: "server is running" });
});
