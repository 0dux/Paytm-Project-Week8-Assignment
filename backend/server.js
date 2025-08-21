const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/routes.js");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.listen(port, () => {
  console.log("✅ Server is listening on port :" + port);
});
