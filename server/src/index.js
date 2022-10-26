//*************************** import packages(Libraey) **************************//
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

// Private route authorization config
import privateRouteConfig from "./config/routeConfig";
import googleAuthConfig from "./config/google.config";

//****************************************** Use Packages ***************************//
dotenv.config();
privateRouteConfig(passport);
googleAuthConfig(passport);

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// adding additional passport configuration
app.use(session({ secret: process.env.SECRETORKEY }));
app.use(passport.initialize());
app.use(passport.session());

//*************************** import API **************************//
import Auth from "./API/auth";
import User from "./API/user";
import Menu from "./API/menu";
import Image from "./API/image";
import Review from "./API/review";
import Restuarant from "./API/restaurant";
import Food from "./API/food";

//*************************** Create Routes **************************//
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});
app.use("/auth", Auth);
app.use("/user", User);
app.use("/menu", Menu);
app.use("/image", Image);
app.use("/restuarant", Restuarant);
app.use("/food", Food);

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
