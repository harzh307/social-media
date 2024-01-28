import { NextResponse } from "next/server";
import connectToDatabase from "../../provider/connectToDb";
import User from "../../provider/models/User";

export const GET = async () => {
  const db = await connectToDatabase();

  const users = await User.find({}).exec();

  return NextResponse.json({ users });
};
