import express from "express";
import multer from "multer";
import AWS from "aws-sdk";

//muter config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// AWS S3 Bucket
// const s3Backet = AWS.S3({});

import { ImageModel } from "../../database/allModels";

const Router = express.Router();

Router;

export default Router;
