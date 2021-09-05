const express = require("express");
const path = require("path");
const app = express();
// const cors = require("cors");
require("dotenv").config();

app.use(express.json());
// app.use(
//     cors({
//         origin: ["http://localhost:8080", "http://localhost:3000"],
//         credentials: true,
//     })
// )

const PORT = process.env.PORT || "3001";

if (process.env.NODE_ENV === "production") {
  app.use("/public", express.static(path.join(__dirname, "../../public")));

  app.get("/", (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../../public/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(process.env.NODE_ENV);
  console.log("Server is running");
});
