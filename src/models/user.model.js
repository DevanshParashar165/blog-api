import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    email : {
        type : String,
        unique : true,
        required : true
    }
},{timestamps : true})

const User = mongoose.model("User",UserSchema)

export default User;