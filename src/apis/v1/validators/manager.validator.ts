import { body, param } from "express-validator";

export const managerRegistrationValidator = [
    body("name")
        .notEmpty().withMessage("Manager name is required")
        .isLength({ min: 2, max: 100 }).withMessage("Manager name must be between 2 and 100 characters")
        .trim(),

    body("email")
        .isEmail().withMessage("Valid manager email is required"),

    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 4, max: 30 }).withMessage("Username must be between 4 and 30 characters")
        .matches(/^[a-zA-Z0-9_\.]+$/).withMessage("Username can only contain letters, numbers, dots and underscores")
        .trim(),

    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body("sid")
        .notEmpty().withMessage("Shop ID is required")
];

export const managerLoginValidator = [
    body("username")
        .notEmpty().withMessage("Username or email is required")
        .trim(),

    body("password")
        .notEmpty().withMessage("Password is required")
];

export const assignManagerValidator = [
    body("name")
        .notEmpty().withMessage("Manager name is required")
        .isLength({ min: 2, max: 100 }).withMessage("Manager name must be between 2 and 100 characters")
        .trim(),

    body("email")
        .isEmail().withMessage("Valid manager email is required"),

    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 4, max: 30 }).withMessage("Username must be between 4 and 30 characters")
        .matches(/^[a-zA-Z0-9_\.]+$/).withMessage("Username can only contain letters, numbers, dots and underscores")
        .trim(),

    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    param("shopId")
        .notEmpty().withMessage("Shop ID is required")
        .isUUID().withMessage("Invalid shop ID format"),

    body("role")
        .notEmpty().withMessage("Role is required")
        .equals("ADMIN").withMessage("Role must be ADMIN for assigned managers")
]; 