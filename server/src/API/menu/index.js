import express, { json } from "express";
import passport from "passport";

const Router = express.Router();

import { MenuModel, ImageModel } from "../../database/allModels";
import { validateId } from "../../validation/common.validation";

/**
 * Route     /add/:_id
 * Des       Add new menu
 * Params    none
 * Access    Public
 * Method    POST
 */

Router.post("/add/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const menuData = req.body;
    // console.log(menuData);
    if (!menuData) {
      return res.status(400).json({
        success: false,
        message: "No data provided",
      });
    }
    const newMenu = await MenuModel.create(menuData);
    return res.json(newMenu);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /add/:_id
 * Des       update menu for restaurant
 * Params    none
 * Access    Private
 * Method    POST
 */
Router.post(
  "update/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const { newMenuDetails } = req.body;
      const addNewMenu = await MenuModel.findByIdAndUpdate(
        {
          user: _id,
        },
        {
          $push: { newMenuDetails },
        },
        {
          new: true,
        }
      );
      return res.json({
        addNewMenu,
        status: "success",
        message: "New Menu added successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route     /list/:_id
 * Des       Get menu based on menu id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menuList = await MenuModel.findById(_id);
    if (!menuList)
      return res
        .status(404)
        .json({ error: "No menu present for this restaurant" });
    return res.json({ menuList, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /image/:_id
 * Des       Get all list of menu images with id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menuImages = ImageModel.findById(_id);
    if (!menuImages)
      return res.status(404).json({ error: "No menu images found." });
    return res.json({ menuImages, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default Router;
