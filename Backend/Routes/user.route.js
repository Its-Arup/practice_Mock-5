const express = require("express");
const { UserModel } = require("../Model/user.model");

userRouter = express.Router();

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
    res.status(400).send({msg : error.message});
  }
});


module.exports= {
    userRouter
}
