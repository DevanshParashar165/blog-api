import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// Create a post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      return res.json(new ApiResponse(404, {}, "Title is required"));
    }
    if (!content) {
      return res.json(new ApiResponse(404, {}, "Content is required"));
    }
    const authorId = req.user._id;
    if (!authorId) {
      return res.json(new ApiResponse(400, {}, "User not Authorized"));
    }
    const post = await Post.create({
      title,
      content,
      authorId,
    });
    return res.json(new ApiResponse(201, post, "Post created successfully"));
  } catch (error) {
    console.log(error.message);
    return res.json(new ApiResponse(400, {}, error.message));
  }
};

// function for reading post
const readPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.json(new ApiResponse(404, [], "No posts found"));
    }

    return res.json(new ApiResponse(200, posts, "Posts fetched successfully"));
  } catch (error) {
    console.error(error.message);
    return res.json(new ApiResponse(500, {}, error.message));
  }
};

// Function to read single post
const readSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json(new ApiResponse(400, {}, "Invalid Post ID"));
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.json(new ApiResponse(404, {}, "Post not found"));
    }
    return res.json(new ApiResponse(200, post, "Post recieved Successfully"));
  } catch (error) {
    console.log(error.message);
    return res.json(new ApiResponse(400, {}, error.message));
  }
};

// Function to update post

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json(
        new ApiResponse(400, {}, "Invalid Post ID")
      );
    }

    if (!title && !content) {
      return res.json(
        new ApiResponse(400, {}, "Nothing to update")
      );
    }
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.json(
        new ApiResponse(404, {}, "Post not found")
      );
    }

    return res.json(
      new ApiResponse(200, updatedPost, "Post updated successfully")
    );

  } catch (error) {
    console.error(error.message);
    return res.json(
      new ApiResponse(500, {}, "Internal server error")
    );
  }
};

const deletePost = async(req,res)=>{
    try {
      const {id} = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json(
          new ApiResponse(400, {}, "Invalid Post ID")
        );
      }
      const post = await Post.findByIdAndDelete(id);
      if(!post){
          return res.json(new ApiResponse(404,{},"Post not found that is to be deleted"));
      }
      return res.json(new ApiResponse(200,{},"Post deleted successfully"));
    } catch (error) {
      console.log(error.message)
      return res.json(new ApiResponse(400,{},error.message))
    }
}


export { createPost, readPost, readSinglePost ,updatePost,deletePost};
