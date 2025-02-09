import { body } from "express-validator";

export const shopRegistrationValidator = [
    // Shop Validations
    body("name")
        .notEmpty().withMessage("Shop name is required")
        .isLength({ min: 3, max: 100 }).withMessage("Shop name must be between 3 and 100 characters"),

    body("email")
        .isEmail().withMessage("Valid shop email is required"),

    body("phone")
        .isMobilePhone("any").withMessage("Valid phone number is required")
        .trim(),

    body("address")
        .optional()
        .isLength({ min: 5, max: 200 }).withMessage("Address must be between 5 and 200 characters"),

    body("country")
        .optional()
        .isLength({ min: 2, max: 100 }).withMessage("Country must be between 2 and 100 characters"),

    body("website")
        .optional()
        .isURL().withMessage("Website must be a valid URL")
        .trim(),

    body("bin")
        .optional()
        .isLength({ min: 5, max: 50 }).withMessage("BIN must be between 5 and 50 characters")
        .trim(),

    body("description")
        .optional()
        .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),

    body("industry")
        .optional()
        .isLength({ min: 2, max: 100 }).withMessage("Industry must be between 2 and 100 characters"),

    body("type")
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage("Type must be between 2 and 50 characters"),

    body("employeeRange")
        .optional()
        .isLength({ max: 50 }).withMessage("Employee range cannot exceed 50 characters"),

    // Manager Validations
    body("manager.name")
        .notEmpty().withMessage("Manager name is required")
        .isLength({ min: 2, max: 100 }).withMessage("Manager name must be between 2 and 100 characters")
        .trim(),

    body("manager.email")
        .isEmail().withMessage("Valid manager email is required")
        .normalizeEmail(),

    body("manager.username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 4, max: 30 }).withMessage("Username must be between 4 and 30 characters")
        .matches(/^[a-zA-Z0-9_\.]+$/).withMessage("Username can only contain letters, numbers, dots and underscores")
        .trim(),

    body("manager.password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),





]; 