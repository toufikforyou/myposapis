import "dotenv/config";
import app from "./src/index.js";

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server running http://localhost:${process.env.SERVER_PORT}`);
});
