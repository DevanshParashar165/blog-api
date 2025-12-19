import { Router } from "express";
import { createPost, deletePost, readPost, readSinglePost, updatePost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPostValidator, postIdParamValidator, readPostsValidator } from "../validators/post.validator.js";

const postRouter = Router();

// protect all post routes
postRouter.use(verifyJWT);

// Create post & Read posts
postRouter.route("/")
  .post(validate(createPostValidator), createPost)
  .get(validate(readPostsValidator), readPost);

// Read / Update / Delete single post
postRouter.route("/:id")
  .get(validate(postIdParamValidator), readSinglePost)
  .put(validate(postIdParamValidator), updatePost)
  .delete(validate(postIdParamValidator), deletePost);

export default postRouter;
