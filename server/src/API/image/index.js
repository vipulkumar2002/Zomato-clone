import express from "express";
import multer from "multer";

import { ImageModel } from "../../database/allModels";

import { s3Upload } from "../../utils/s3";
import { validateId } from "../../validation/common.validation";

//muter config
const storage = multer.memoryStorage();
const upload = multer({ storage });

const Router = express.Router();

/**
 * Route     /:_id
 * Des       Get image details
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const image = await ImageModel.findById(req.params._id);
    return res.json({ image });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /
 * Des       Upload given image to s3 bucket and save file link to mongoDB
 * Params    _id
 * Access    Public
 * Method    POST
 */
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const bucketOptions = {
      Bucket: "vipul-zomato-clone",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // access control list
    };

    const uploadImage = await s3Upload(bucketOptions);

    const dbUpload = await ImageModel.create({
      images: [
        {
          location: uploadImage.Location,
        },
      ],
    });

    return res.status(200).json({ dbUpload });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
