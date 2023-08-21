const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const BlackListModel = require("../models/blacklist");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(200).send({ msg: "user already exists please sign in" });
    } else {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          res.status(400).send({ msg: "unable to sign up", err: err.message });
        } else {
          const user = await UserModel.create({ ...req.body, password: hash });
          res
            .status(200)
            .send({ msg: "new user has been created", user: user });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "sign up failed", err: err.message });
  }
});
/*
"name": "jk1",
  "email": "jk1@gmail.com",
  "gender":"f",
  "password": "jk@1234",
  "age": 100,
  "city": "ghy",
  "is_married":false
*/

//login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(400).send({ msg: "user not found", err: err.message });
        } else {
          let token = jwt.sign({ userId: user[0]._id }, "secret3", {
            expiresIn: "7d",
          });
          res
            .status(200)
            .send({ msg: "user successfully logged in", token: token });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "sign in failed", err: error.message });
  }
  /*
  "email": "jk2@gmail.com",
  "password": "jk@1234"
  */

  userRouter.get("/logout", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1] || null;
      if (token) {
        await BlackListModel.updateMany({}, { $push: { blacklist: [token] } });
        res
          .status(200)
          .send({ msg: "user has been logged out,please log in again" });
      }
    } catch (error) {
      res.status(200).send({ err: error.message });
    }
  });
});
module.exports = userRouter;
