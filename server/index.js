// import packages
import dotenv from "dotenv";
// initilize dotenv
dotenv.config();
import express from "express";
// import cors from "cors";
// import helmet from "helmet";
//Helmet helps you secure your Express apps by setting various HTTP headers

//use packages
const app = express();

app.use(express.json());
// app.use(cors());
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
  res.json({ message: "server is running." });
});

app.listen(4000, () => {
  console.log("Server is running !!");
});
