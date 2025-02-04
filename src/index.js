import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./apis/index.js";
import { errorHandler } from "./middlewares/api.error.middleware.js";
import setHeader from "./utils/header.utils.js";
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/robots.txt", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../robots.txt"));
});

app.use("/404", async (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(setHeader);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use((_, res) => {
  res.redirect("/404");
});

// Api Error Middleware
app.use(errorHandler);

export default app;
