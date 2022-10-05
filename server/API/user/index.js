import express from "express";
import passport from "passport";
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

export default Router;
