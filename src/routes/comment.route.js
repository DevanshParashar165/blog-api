import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment, deleteComment, readComments, readSingleComment, updateComment } from "../controllers/comment.controller.js";

const commentRouter = Router()

commentRouter.use(verifyJWT)

commentRouter.route('/')
             .post(createComment)
             .get(readComments)
commentRouter.route('/:id')
             .get(readSingleComment)
             .put(updateComment)
             .delete(deleteComment)

export default commentRouter             