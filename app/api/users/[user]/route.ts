import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../provider/connect-to-db";
import User from "../../../provider/models/user";
import Posts from "../../../provider/models/posts";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const db = await connectToDatabase();
  // @ts-ignore
  const user = await User.findById(res?.params?.user)
    .populate({
      path: "posts",
      model: Posts,
      select: "content image likes comments createdAt",
    })
    .exec();

  return NextResponse.json({ user });
};
