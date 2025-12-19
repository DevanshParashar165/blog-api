import { body, param, query } from "express-validator";

export const createPostValidator = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 6, max: 50 })
    .withMessage("Title must be between 6 and 50 characters"),

  body("content")
    .notEmpty().withMessage("Content is required")
    .isLength({ min: 50, max: 500 })
    .withMessage("Content must be between 50 and 500 characters"),
];

export const postIdParamValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid post id"),
];

export const readPostsValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive number"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive number"),
];
