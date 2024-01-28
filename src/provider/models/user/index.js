import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    // Add other fields as needed
    bio: {
      type: String,
    },
    profilePicture: {
      type: String, // URL of the profile picture
    },
    // Add any other fields you need for your user model
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// // Virtual property for post count
// userSchema.virtual("postCount").get(function () {
//   return this.posts?.length;
// });

// // Virtual property for followers count
// userSchema.virtual("followersCount").get(function () {
//   return this.followers?.length;
// });

// // Virtual property for following count
// userSchema.virtual("followingCount").get(function () {
//   return this.following?.length;
// });

export default mongoose.models.User || mongoose.model("User", userSchema);
