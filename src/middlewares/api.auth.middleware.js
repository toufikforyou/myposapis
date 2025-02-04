import ApiResponse from "../models/api.response.model.js";

export default (req, res, next) => {
  const apiKey =
    req.headers["x-api-key"] || req.query.api_key || "your-api-key";
  const serverIp = req.headers["cf-connecting-ip"] || req.ip;
  const hostname = req.hostname;

  console.log(serverIp, hostname);

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json(
      new ApiResponse.Error(401, "Unauthorized", {
        message: "Invalid API Key",
      })
    );
  }

  next();
};
