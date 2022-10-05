import express from "express";
import passport from "passport";
const Router = express.Router();

import { FoodModel } from "../../database/allModels";

/**
 * Route     /add/:_id
 * Des       Create New Food Item
 * Params    _id
 * Access    Private
 * Method    POST
 */
Router.post(
  "/add/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const { foodDetails } = req.body;
      const addNewFoodItem = await FoodModel.findByIdAndUpdate(
        { user: _id },
        { $push: { foodDetails } },
        { new: true }
      );

      return res.json({
        addNewFoodItem,
        sataus: "success",
        message: "Food Added",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route     /:_id
 * Des       Get food based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const food = await FoodModel.findById(_id);
    return res.json({
      food,
      status: "success",
      message: "Food is Found based on id.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /r/:_id
 * Des       Get all food based on particular restaurant
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/r/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods = await FoodModel.find({ restaurent: _id });
    return res.json({
      foods,
      status: "success",
      message: "Get all food based on particular restaurant.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /c/:category
 * Des       Get all food based on particular category
 * Params    category
 * Access    Public
 * Method    GET
 */
Router.get("/c/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const foods = FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    if (!foods)
      return res.status(404).json({
        error: `No food matched with ${category}`,
      });

    return res.json({
      foods,
      status: "success",
      message: "Get all food based on particular category",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /delete/:_id
 * Des       delete food based on particular id
 * Params    _id
 * body      none
 * Access    Public
 * Method    DELETE
 */
Router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await FoodModel.findOneAndDelete({ _id });
    return res.json({
      food: {},
      status: "success",
      message: "Food deleted",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
