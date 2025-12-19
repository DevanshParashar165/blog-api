import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required : true
    },
    content: {
      type: String,
      maxlength: 100,
      required: true,
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required : true
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment",commentSchema)
