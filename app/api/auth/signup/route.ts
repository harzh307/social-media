// @ts-ignore
import bcrypt from "bcryptjs";
// @ts-ignore
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";
import "dotenv/config";
import User from "../../../provider/models/user";
import connectToDatabase from "../../../provider/connect-to-db";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const db = connectToDatabase();
    const { email, password, name } = await req?.json();
    if (!email) {
      return Response.json("Email is required");
    }
    if (!password) {
      return Response.json("Password is required");
    }
    if (!name) {
      return Response.json("Name is required");
    }
    const existingUser = await User.findOne(
      {
        email,
      },
      {}
    );
    if (existingUser) {
      return Response.json(
        "User already exist with the same email, login insted"
      );
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

    const token = jwt.sign(tokenPayload, "token", options);
    return Response.json({
      user,
      token,
      message: "user created successfully",
    });
  } catch (error: any) {
    return Response.json({
      message: error.message,
    });
  }
};
