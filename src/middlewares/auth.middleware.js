import jwt from "jsonwebtoken"
import { ApiResponse } from "../utils/ApiResponse.js"

export const verifyJWT = async(res,req,next)=>{
    try {
        const token = req?.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        return res.json(new ApiResponse(401,{},error,message || "User not authorzed"))
    }
}