const express = require("express");
const connection = require("./db");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected");
    console.log("server running at port 8080");
  } catch (error) {
    console.log(error);
  }
});
