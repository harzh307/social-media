import { NextResponse } from "next/server";
import User from "../../models/user";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    const { populate, path } = req.query;
    if (path && (!path.trim() || !populate)) {
      return NextResponse.status(400).send({
        message:
          "to populate relation enter the path of relation then the field of relation ex:- ?path=post&populate=followers,following,posts",
      });
    }
    if (populate && populate?.trim()) {
      const select = populate.split(",").join(" ");
      const users = await User.find({}).populate({
        path,
        model: Posts,
        select,
      });
      console.log("ALL POPULATED USERS::::", users);
      return NextResponse.status(200).send({ users });
    }
    return NextResponse.status(200).send({ users });
  } catch (error) {
    NextResponse.status(500).send({ message: error.message });
  }
};
