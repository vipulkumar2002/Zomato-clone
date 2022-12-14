import express from "express";
import passport from "passport";
import { UserModel } from "../../database/user";
import { validateId } from "../../validation/common.validation";
const Router = express.Router();

/**
 * Route     /
 * Des       Get authorized user data
 * Params    none
 * Access    Private
 * Method    GET
 */
Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { email, fullName, phoneNumber, address } = req.user;

      return res.json({
        user: { email, fullName, phoneNumber, address },
        status: "success",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route     /:_id
 * Des       Get user data (For the review system)
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    await validateId(req.params);
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);
    if (!getUser) return res.status(404).json({ error: "User not found !" });
    const { fullName } = getUser;
    return res.json({ user: fullName, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /:_id
 * Des       Update user data
 * Params    _id
 * Access    Private
 * Method    PUT
 */

Router.put(
  "/update/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const { userData } = req.body;

      // userData.password = undefined;

      const updateUserData = await UserModel.findByIdAndUpdate(
        { user: _id },
        {
          $set: userData,
        },
        {
          new: true,
        }
      );
      return res.json();
    } catch (error) {
      return res.status(505).json({ error: error.message });
    }
  }
);

export default Router;
