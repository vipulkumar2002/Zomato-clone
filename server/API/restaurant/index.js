import express from "express";

const Router = express.Router();

import { RestaurantModel } from "../../database/allModels";

/**
 * Route     /add
 * Des       Create New restaurant
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/add", async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      cuisine,
      restaurantTiming,
      contactNum,
      webside,
      populerDishes,
      averageCast,
      amenties,
      menuImages,
      reviews,
      photos,
    } = req.body;
    const restaurant = new RestaurantModel({
      name,
      city,
      address,
      cuisine,
      restaurantTiming,
      contactNum,
      webside,
      populerDishes,
      averageCast,
      amenties,
      menuImages,
      reviews,
      photos,
    });
    await restaurant.save();
    return res.json({
      restaurant,
      status: "success",
      message: "Restaurant is added !",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /add
 * Des       Get Restaurent based on city
 * Params    city
 * body      none
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    //query(example) => http://localhost:4000/restaurant/?city=indore
    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });
    if (restaurants === 0) {
      return res
        .status(404)
        .json({ error: "No restaurant found in this city." });
    }
    return res.json({
      restaurants,
      status: "success",
      message: "All Restaurent based on city !",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /:_id
 * Des       Get individual restuarant details based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findById(_id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found !" });
    }
    return res.json({
      restaurant,
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /search/:searchString
 * Des       Get restaurants details based on search string
 * Params    searchString
 * Access    Public
 * Method    GET
 */
Router.get("/search/:searchString", async (req, res) => {
  try {
    const { searchString } = req.params;
    const restaurant = await RestaurantModel({
      name: { $regex: searchString, $options: "i" },
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ error: `No restaurant matched with ${searchString}` });
    }
    return res.json({
      restaurant,
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
