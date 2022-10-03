//*************************** import packages(Libraey) **************************//
import dotenv from "dotenv";
// initilize dotenv
dotenv.config();
import express from "express";
import helmet from "helmet";
//Helmet helps you secure your Express apps
//by setting various HTTP headers

//use packages
const app = express();

app.use(express.json());
// app.use(cors());
app.use(helmet());

//*************************** import API **************************//
import Auth from "./API/Auth";

//*************************** Create Routes **************************//
app.use("/auth", Auth);

//connect DB
import connectDB from "./database/connection";

const PORT = process.env.DEFAULT_PORT;
app.listen(PORT, () => {
  connectDB()
    .then(() => {
      console.log(`Server is running at ${PORT} !!`);
    })
    .catch((err) => {
      console.log("Server is running, but database connection failed..!!");
      console.log(err);
    });
});
