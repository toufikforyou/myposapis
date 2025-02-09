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
];