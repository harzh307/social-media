import Posts from "../../models/posts";
import User from "../../models/user";

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find({});
    const { populate, path } = req.query;
    if (path && !path.trim()) {
      return res.status(400).send({
        message:
          "to populate relation enter the path of relation then the field of relation ex:- ?path=user&populate=name,email",
      });
    }
    const select = populate
      .split(",")
      .filter((x) => x !== "password")
      .join(" ");
    if (populate?.trim()) {
      const posts = await Posts.find({}).populate({
        path,
        model: User,
        select,
      });
      return res.status(200).send({ posts });
    }
    return res.status(200).send({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createPost = async (req, res) => {
  try {
    // Extract data from the request body
    const { user, content, image } = req.body;

    // Validate the data (perform additional validation as needed)
    if (!user) {
      return res.status(400).send("User is required");
    }
    if (!content) {
      return res.status(400).send("Content is required");
    }
    if (!image) {
      return res.status(400).send("Image is required");
    }
    const userExist = await User.findById(user);
    if (!userExist) {
      return res.status(400).send({
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
    return res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { createPost, getPosts };
