import { body, param, query } from "express-validator";

export const createCommentValidator = [
  body("postId")
    .notEmpty().withMessage("postId is required")
    .isMongoId().withMessage("Invalid postId"),

  body("content")
    .notEmpty().withMessage("Comment content is required")
    .isLength({ min: 1 }).withMessage("Comment cannot be empty")
];

export const readCommentsValidator = [
  query("post_id")
    .notEmpty().withMessage("post_id is required")
    .isMongoId().withMessage("Invalid post_id")
];

export const commentIdParamValidator = [
  param("id")
    .isMongoId().withMessage("Invalid comment id")
];
