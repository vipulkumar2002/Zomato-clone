"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import packages
require("dotenv").config(); // importing dotenv


// import cors from "cors";
// import helmet from "helmet";
//Helmet helps you secure your Express apps by setting various HTTP headers
//use packages
const app = (0, _express.default)();
app.use(_express.default.json()); // app.use(cors());
// app.use(helmet());
//connect DB
// import connectDB from "./database/connection";
// const PORT = process.env.DEFAULT_PORT;
// app.listen(PORT, () => {
//   connectDB()
//     .then(() => {
//       console.log(`Server is running at ${PORT} !!`);
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log("Server is not running !!");
//     });
// });

app.get("/", (req, res) => {
  res.json({
    message: "server is running."
  });
});
app.listen(4000, () => {
  console.log("Server is running !!");
});