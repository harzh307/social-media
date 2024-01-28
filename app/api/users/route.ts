import { NextResponse } from "next/server";
import connectToDatabase from "../../provider/connect-to-db";
import User from "../../provider/models/user";

export const GET = async () => {
  const db = await connectToDatabase();

  const users = await User.find({}).exec();

  return NextResponse.json({ users });
};
