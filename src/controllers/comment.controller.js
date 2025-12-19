import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";


// Function to post a comment on a post

const createComment = async(req,res)=>{
    try {
        const {content , postId} = req.body;
        const authorId = req.user._id
        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.json(new ApiResponse(404,{},"Post not found"))
        }
        if(!mongoose.Types.ObjectId.isValid(authorId)){
            return res.json(new ApiResponse(404,{},"User does not exist"))
        }
        if(!content){
            return res.json(new ApiResponse(404,{},"Content not found"));
        }
        const comment = await Comment.create({
            postId,
            content,
            authorId
        })
        if(!comment){
            return res.json(new ApiResponse(400,{},"Error while creating comment"))
        }
        return res.json(new ApiResponse(201,{comment},"Comment posted successfully"))
    } catch (error) {
        console.log(error.message)
        return res.json(new ApiResponse(400,{},error.message))
    }
}

// Function to read comments

const readComments = async (req, res) => {
  try {
    const { post_id } = req.query;

    if (!post_id) {
      return res.status(400).json({
        message: "post_id query parameter is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(post_id)) {
      return res.status(400).json({
        message: "Invalid post id"
      });
    }

    const comments = await Comment.find({ post: post_id })
      .sort({ createdAt: -1 });

    return res.status(200).json(new ApiResponse(200,comments,"Comments fetched successfully"));
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message });
  }
};

// Function to read single comment

const readSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json(new ApiResponse(400, {}, "Invalid Comment ID"));
    }
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.json(new ApiResponse(404, {}, "Comment not found"));
    }
    return res.json(new ApiResponse(200, post, "Comment recieved Successfully"));
  } catch (error) {
    console.log(error.message);
    return res.json(new ApiResponse(400, {}, error.message));
  }
};

// Function to update post

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const {content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json(
        new ApiResponse(400, {}, "Invalid Comment ID")
      );
    }

    if (!content) {
      return res.json(
        new ApiResponse(400, {}, "Nothing to update")
      );
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      content,
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.json(
        new ApiResponse(404, {}, "Comment not found")
      );
    }

    return res.json(
      new ApiResponse(200, updatedPost, "Comment updated successfully")
    );

  } catch (error) {
    console.error(error.message);
    return res.json(
      new ApiResponse(500, {}, "Internal server error")
    );
  }
};

// Function to delete comment

const deleteComment = async(req,res)=>{
    try {
      const {id} = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json(
          new ApiResponse(400, {}, "Invalid Comment ID")
        );
      }
      const comment = await Comment.findByIdAndDelete(id);
      if(!comment){
          return res.json(new ApiResponse(404,{},"Comment not found that is to be deleted"));
      }
      return res.json(new ApiResponse(200,{},"Comment deleted successfully"));
    } catch (error) {
      console.log(error.message)
      return res.json(new ApiResponse(400,{},error.message))
    }
}


export {createComment,readComments,readSingleComment,updateComment,deleteComment}