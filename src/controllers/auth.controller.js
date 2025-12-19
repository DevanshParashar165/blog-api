import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// Function to generate refresh and access token
const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message)
    return res.json(
      new ApiResponse(
        500,
        {},
        `Something went wrong while generating refresh and access token, Error : ${error.message}`
      )
    );
  }
};

// Function for user registration
const registerUser = async (req, res) => {
  try {
    const { username, email, password,role } = req.body;
    if (!username || !email || !password||!role) {
      return res.json(new ApiResponse(404, {}, "User details not found"));
    }
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      return res.json(
        new ApiResponse(400, { existedUser }, "User already existed")
      );
    }
    const user = await User.create({
      email,
      fullname,
      password,
      role,
    });
    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
      user._id
    );
    if (!user) {
      return res.json(
        new ApiResponse(500, {}, "Something went wrong while registering user")
      );
    }

    const options = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
    }

    return res
    .cookie("accessToken",accessToken,options)
    .json(
      new ApiResponse(
        201,
        { user, accessToken, refreshToken },
        "User Registered Successfully"
      )
    );
  } catch (error) {
    console.log(error.message)
    return res.json(400, {}, error.message);
  }
};

//Fuction to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json(new ApiResponse(404, {}, "Email is required"));
    }
    if (!password) {
      return res.json(new ApiResponse(404, {}, "Password is required"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json(new ApiResponse(404, {}, "User does not exist"));
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.json(new ApiResponse(401, {}, "Invalid User credentials"));
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
    }

    return res
    .cookie("accessToken",accessToken,options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
  } catch (error) {
    return res.json(400, {}, error.message);
  }
};

const logout = async (req,res) =>{
  try {
    await User.findByIdAndUpdate(req.user._id,{
          $unset : {refreshToken : 1}//this removes the fields from document
      })
  
      const options = {
          httpOnly : true,
          secure : true,
          sameSite : "None",
          path : "/"
      }
      return res.status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .clearCookie("username")
      .json(
          new ApiResponse(200,{},"User logged Out")
      )
  } catch (error) {
    console.log(error.message)
    return res.json(400,{},"Something went wrong while logging out user")
  }
}

// Fetch User details
const getUserDetails = async(req,res)=>{
    return res.status(200).json(new ApiResponse (200,req.user,"Current User fetched Successfully!!!"))
}


export { registerUser, loginUser,getUserDetails,logout };
