import ApiResponse from "../models/api.response.model.js";

const errorHandler = (err, _, res, next) => {
  res
    .status(err.status_code || 500)
    .json(
      new ApiResponse.Error(err.status_code || 500, err.message, err.errors)
    );
};

export { errorHandler };
