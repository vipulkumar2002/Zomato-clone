// import packages
require("dotenv").config();           // importing dotenv
require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});                                   //importing babel

import  express  from "express";
import cors from "cors";
import helmet from helmet; //Helmet helps you secure your Express apps by setting various HTTP headers

//use packages
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

