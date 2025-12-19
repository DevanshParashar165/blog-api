import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment, deleteComment, readComments, readSingleComment, updateComment,} from "../controllers/comment.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCommentValidator, readCommentsValidator, commentIdParamValidator} from "../validators/comment.validator.js";

const commentRouter = Router();

// protect all comment routes
commentRouter.use(verifyJWT);

// Create comment
commentRouter.post("/", validate(createCommentValidator), createComment);

// Read comments (filtered by post_id)
commentRouter.get("/", validate(readCommentsValidator), readComments);

// Read / Update / Delete single comment
commentRouter
  .route("/:id")
  .get(validate(commentIdParamValidator), readSingleComment)
  .put(validate(commentIdParamValidator), updateComment)
  .delete(validate(commentIdParamValidator), deleteComment);

export default commentRouter;
