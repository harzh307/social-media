import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../provider/connect-to-db";
import Posts from "../../../provider/models/posts";
import User from "../../../provider/models/user";

export const GET = async () => {
  const db = await connectToDatabase();

  const posts = await Posts.find({})
    .populate({
      path: "user",
      model: User,
      select: "name email",
    })
    .exec();

  return NextResponse.json({ posts });
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { user, content, image } = await req.json();

  // Extract data from the request body
  // const { user, content, image } = req.body;

  // console.log(req.body);

  // Validate the data (perform additional validation as needed)
  if (!user) {
    return NextResponse.json("User is required");
  }
  if (!content) {
    return NextResponse.json("Content is required");
  }
  if (!image) {
    return NextResponse.json("Image is required");
  }
  const userExist = await User.findById(user);
  if (!userExist) {
    return NextResponse.json({
      message: "invalid user id, please check and send _id value in user key",
    });
  }
  // Create a new post instance using your model
  const newPost = new Posts({
    user,
    content,
    image,
  });

  // Save the post to the database
  await newPost.save();
  await User.findByIdAndUpdate(user, { $push: { posts: newPost._id } });
  // Respond with a success message and the created post
  return NextResponse.json({
    message: "Post created successfully",
    post: newPost,
  });
  const db = await connectToDatabase();

  const posts = await Posts.find({})
    .populate({
      path: "user",
      model: User,
      select: "name email",
    })
    .exec();

  return NextResponse.json({ posts });
};
