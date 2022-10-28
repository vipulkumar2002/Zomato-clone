import express from "express";

const Router = express.Router();

import { RestaurantModel } from "../../database/restaurant/index";
import {
  ValidateRestaurantCity,
  ValidateSearchString,
} from "../../validation/restaurant.validation";

/**
 * Route     /add
 * Des       Create New restaurant
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/add", async (req, res) => {
  try {
    const restaurantData = req.body;

    // console.log(restaurantData);

    if (!restaurantData) {
      return res.status(400).json({
        success: false,
        message: "No data provided",
      });
    }
    const newRestaurant = await RestaurantModel.create(restaurantData);

    return res.status(200).json({
      newRestaurant,
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
    await ValidateRestaurantCity(req.query);
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
    await ValidateSearchString(req.params);
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
