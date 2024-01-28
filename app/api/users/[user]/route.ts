import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/provider/connectToDb";
import User from "../../../provider/models/User";
import Posts from "../../../provider/models/Posts";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const db = await connectToDatabase();
  console.log(res.params.user);

  const user = await User.findById(res?.params?.user)
    .populate({
      path: "posts",
      model: Posts,
      select: "content image likes comments createdAt",
    })
    .exec();

  return NextResponse.json({ user });
};
