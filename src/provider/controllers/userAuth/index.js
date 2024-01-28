import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../const";

const signUp = async (req, res, next) => {
  try {
    const { email, password, name } = req?.body;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    if (!password) {
      return res.status(400).send("Password is required");
    }
    if (!name) {
      return res.status(400).send("Name is required");
    }
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res
        .status(400)
        .send("User already exist with the same email, login insted");
    }
    const hashPassword = bcrypt.hashSync(password);
    const user = new User({
      email,
      name,
      password: hashPassword,
    });
    await user.save();
    const tokenPayload = {
      userId: user._id,
      email: user.email,
    };
    const options = {};

    const token = jwt.sign(tokenPayload, SECRET_KEY, options);
    return res
      .status(200)
      .send({ user, token, message: "user created successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req?.body;
    if (!email) {
      return res.status(400).send("Email is required");
    }
    if (!password) {
      return res.status(400).send("Password is required");
    }

    const existingUser = await User.findOne({
      email,
    }).select("+password");
    if (!existingUser) {
      return Response.json({
        message:
          "User does not exist with this same email, try different email insted",
      });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: "Incorrect password" });
    }
    const tokenPayload = {
      userId: existingUser._id,
      email: existingUser.email,
    };
    const options = {};
    const user = await User.findById(existingUser._id);

    const token = jwt.sign(tokenPayload, SECRET_KEY, options);
    return res.status(200).send({
      user,
      token,
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export { signUp, login };
