import mongoose, { Schema } from "mongoose";

// Post database Schema

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxlength : 50,
        minlength : 6
    },
    content : {
        type : String,
        required : true,
        maxlength : 500,
        minlength : 50
    },
    authorId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})

export const Post = mongoose.model("Post",postSchema)