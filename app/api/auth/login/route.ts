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
    const { email, password } = await req?.json();
    if (!email) {
      return Response.json("Email is required");
    }
    if (!password) {
      return Response.json("Password is required");
    }
    const existingUser = await User.findOne({
      email,
    }).select("+password");
    if (!existingUser) {
      return Response.json(
        "User does not exist with this same email, try different email insted"
      );
    }
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return Response.json({ message: "Incorrect password" });
    }
    const tokenPayload = {
      userId: existingUser._id,
      email: existingUser.email,
    };
    const options = {};
    const user = await User.findById(existingUser._id);

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
