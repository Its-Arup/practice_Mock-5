const express = require("express");
const { UserModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlackList_Token } = require("../Model/blackList.model");
require("dotenv").config();
const userRouter = express.Router();

// user register Route

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      res.status(200).send({ msg: "user already registered ! please login" });
    } else {
      const newUser = await new UserModel(req.body);

      const hashPassword = await bcrypt.hash(password, 8);

      newUser.name = name;
      newUser.email = email;
      newUser.password = hashPassword;
      await newUser.save();

      res
        .status(200)
        .send({ mag: "user register successfully !", user: newUser });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// user Login route

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const decodeHash = bcrypt.compareSync(password, user.password);
      if (decodeHash) {
        const token = jwt.sign(
          {
            userID: user._id,
            userName: user.name,
          },
          process.env.SECRETKEY,
          { expiresIn: "2 days" }
        );
        res.status(200).send({ msg: "User login successfully!", token: token });
      } else {
        res.status(400).send({ msg: "please Check Your password first!" });
      }
    } else {
      res.status(200).send({ msg: "please register first!" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;

    if (token) {
      const blacklist = await BlackList_Token({ blackList : token });
      await blacklist.save();
      res.status(200).send({ msg: "User logged out successfully!" });
    } else {
      res.status(400).send({ msg: "token not found!" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  userRouter,
};
