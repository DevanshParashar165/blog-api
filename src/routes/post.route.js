import { Router } from "express";
import { createPost, deletePost, readPost, readSinglePost, updatePost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const postRouter = Router()
// protect all routes
postRouter.use(verifyJWT)

postRouter.route('/')
            .post(createPost)
            .get(readPost)
postRouter.route('/:id')
          .get(readSinglePost) 
          .put(updatePost)
          .delete(deletePost)                        

export default postRouter